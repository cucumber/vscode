
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as rd from 'readline';
import * as vscode from 'vscode';

export namespace cucumber {

    export class tree_view implements vscode.TreeDataProvider<tree_item>
    {
        private data : tree_view_data = new tree_view_data();
        private event_emitter: vscode.EventEmitter<tree_item | undefined> = new vscode.EventEmitter<tree_item | undefined>();

        readonly onDidChangeTreeData? : vscode.Event<tree_item | undefined> = this.event_emitter.event;
   
        private readonly regex_feature = new RegExp('(?<=Feature:).*');
        private readonly regex_scenario = new RegExp('(?<=Scenario:).*');
        // TODO: needed? is it to much in tree to collapse to every single step??
        // private readonly regex_steps = new RegExp('(?<=Given|Then|When|And|But|\\*).*');
        private readonly regex_scenario_outline = new RegExp('(?<=Scenario Outline:).*');
        private readonly regex_example = new RegExp('(?<=\\|).*');

        public constructor()  {
            vscode.commands.registerCommand('cucumber.on_item_clicked', item => this.on_item_clicked(item));
            vscode.commands.registerCommand('cucumber.refresh', () => this.refresh());
            vscode.commands.registerCommand('cucumber.run', () => this.run_all_tests());
            vscode.commands.registerCommand('cucumber.context_menu_run', item => this.run_tree_item(item));
        }

        public getTreeItem(item: tree_item): vscode.TreeItem|Thenable<vscode.TreeItem> {
            var title = item.label ? item.label.toString() : "";
            var result = new vscode.TreeItem(title, item.collapsibleState);
            result.command = { command: 'cucumber.on_item_clicked', title : title, arguments: [item] };
            result.iconPath = item.iconPath;
            return result;
        }
    
        public getChildren(element : tree_item | undefined): vscode.ProviderResult<tree_item[]> {
            return (element === undefined) ? this.data.get_data() : element.children;
        }

        public on_item_clicked(item: tree_item) {
            if (item.file === undefined) return;
            vscode.workspace.openTextDocument(item.file).then( document => {
                vscode.window.showTextDocument(document).then( editor => {
                        var pos = new vscode.Position(item.line.row-1, item.line.length);
                        editor.selection = new vscode.Selection(pos, pos);
                        editor.revealRange(new vscode.Range(pos, pos));
                    }
                );
            });
        }
    
        // TODO Refactor, occasionally tree isn't loaded properly 
        public refresh() {
            if (vscode.workspace.workspaceFolders) {
                this.data.erase_data();
                this.read_directory(vscode.workspace.workspaceFolders[0].uri.fsPath);
                this.reload_tree_data();
            } 
        }

        public reload_tree_data() {
            this.data.update_feature_icons();
            this.event_emitter.fire(undefined);
        }

        private run_all_tests() {
            this.internal_run(undefined);
        }

        private run_tree_item(item: tree_item) {
            var feature = item.file;
            if (item.type === item_type.scenario) {
                feature += ':' + item.line.row;
            }
            this.internal_run(feature);
        }

        private internal_run(feature: string|undefined) {
            const configs = vscode.workspace.getConfiguration("launch").get("configurations") as Array<debug_config>;       
            // TODO select config
            const test_runner = create_test_runner(configs[0], feature);
            test_runner.run_tests().then(() => {
                test_runner.parse_json_report(this.data);
                this.reload_tree_data();
            });
        }

        private read_directory(dir: string) {
            fs.readdirSync(dir).forEach(file => {
                var current = path.join(dir,file);
                if (fs.statSync(current).isFile()) {
                    if(current.endsWith('.feature')) {
                        this.parse_feature_file(current);
                    } 
                } else {
                    this.read_directory(current)
                }
            });
        }

        private parse_feature_file(file: string) {
            var reader = rd.createInterface(fs.createReadStream(file))
            const line_counter = ((i = 1) => () => i++)();
            // TODO refactor, this is ugly
            var scenario_outline_name = '';
            var examples_counter = 0;
            reader.on("line", (current_line : string, line_number : number = line_counter()) => {
                
                var is_feature = current_line.match(this.regex_feature);
                if (is_feature) {
                    this.data.add_item(new tree_item(is_feature[0], file, new line(current_line, line_number), item_type.feature));
                }
                
                var is_scenario = current_line.match(this.regex_scenario);
                if (is_scenario) {
                    this.data.at(-1)?.add_child(new tree_item(is_scenario[0], file, new line(current_line, line_number), item_type.scenario));
                }
                
                var is_scenario_outline = current_line.match(this.regex_scenario_outline);
                if (is_scenario_outline) {
                    scenario_outline_name = is_scenario_outline[0];
                    examples_counter = 0;
                }

                var is_example = current_line.match(this.regex_example);
                if (is_example) {
                    if (examples_counter !== 0){
                        this.data.at(-1)?.add_child(new tree_item(examples_counter.toString()+' '+scenario_outline_name, file, new line(current_line, line_number), item_type.scenario));
                    }
                    examples_counter++;
                }
            });
        }
    }
    
    class tree_view_data {
        private data : tree_item [] = [];
        
        public add_item(item: tree_item) {
            this.data.push(item);
        }

        public get_data() {
            return this.data;
        }

        public update_feature_icons() {
            this.data.forEach((feature) => {
                if (feature.children.every((element) => element.get_last_result() === test_result.passed)) {
                    feature.set_test_result(test_result.passed);
                } else if (feature.children.some((element) => element.get_last_result() === test_result.failed)) {
                    feature.set_test_result(test_result.failed);
                } else if (feature.children.some((element) => element.get_last_result() === test_result.undefined)) {
                    feature.set_test_result(test_result.undefined);
                }  else {
                    feature.set_test_result(test_result.none);
                }            
            });
        }

        public get_scenario_by_uri_and_row(uri: string, line_number: number){
            var feature = this.get_feature_by_uri(uri);
            if (feature) {
                return feature.children.find((scenario) => 
                    scenario.line.row === line_number 
                );
            }            
        }

        private get_feature_by_uri(uri : string) {
            return this.data.find((feature) =>  
                path.normalize(feature.file).includes(path.normalize(uri))
            );
        }
        public erase_data() {
            this.data = [];
        }
        public at(index: number){
            return this.data.at(index);
        }
    }

    class tree_item extends vscode.TreeItem {

        readonly file: string;
        readonly line: line;
        readonly type: item_type;
        readonly children: tree_item[] = [];

        private result: test_result = test_result.none;

        constructor(label: string, file: string, line: line, type: item_type) {
            super(label, vscode.TreeItemCollapsibleState.None);
            this.file = file;
            this.line = line;
            this.collapsibleState = vscode.TreeItemCollapsibleState.None;
            this.type = type;
        }

        public add_child (child : tree_item) {
            this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            this.children.push(child);
        }

        public set_test_result(result: test_result) {
            this.result = result;
            var icon = this.get_icon(result);
            this.iconPath = {
                light: path.join(__filename, '..', '..', 'images', 'treeview', icon),
                dark: path.join(__filename, '..', '..', 'images', 'treeview', icon)
            };
        }

        public get_last_result() {
            return this.result;
        }

        private get_icon(result: test_result) {
            switch (result) {
                case test_result.passed:
                    return 'passed.png';
                case test_result.failed:
                    return 'failed.png';
                case test_result.undefined:
                    return 'undefined.png';
                default:
                    return '';
            }
        }
    }

    class line {
        readonly text : string;
        readonly row : number;
        readonly length : number;

        constructor (text : string, row : number ){
            this.text = text;
            this.length = text.length;
            this.row = row;
        }
    }

    interface debug_config {
        type: string;
        name: string;
        program: string|undefined;
        command: string;
        cwd: string;
    }


    enum test_result {
        none,
        passed,
        undefined,
        failed
    }

    enum item_type {
        feature,
        scenario,
        example_step//,
        // step
    }

    
    function create_test_runner(config: debug_config, feature: string|undefined) {
        
        return new cucumber(config, feature);

        // TODO impl. other runners. 
        // switch (config.command) {
        //     case 'behave':
        //         break;
        
        //     default:
        //       return new cucumber(config, feature);  
        // }
    }

    abstract class test_runner {

        readonly config : debug_config;
        private args: string[] = [];

        constructor(cfg: debug_config) {
            this.config = cfg; 
            
            if (vscode.workspace.workspaceFolders) {
                const wspace_folder = vscode.workspace.workspaceFolders[0].uri.fsPath;
                this.config.cwd = this.config.cwd === undefined ?  wspace_folder : this.config.cwd.replace("${workspaceFolder}", wspace_folder);
                this.config.program = this.config.program === undefined ? undefined : this.config.program.replace("${workspaceFolder}", wspace_folder);   
            }
  
        }
        protected add_argument(arg : string ){
            this.args.push(JSON.stringify(arg));
        }
        protected get_args() {
            return this.args;
        }
        public abstract run_tests() : Promise<unknown>;
        // TODO rename parse_json_report
        public abstract parse_json_report(tree_data: tree_view_data): void;
    }    


    interface cucumber_results {
        id: string;
        uri: string;
        elements: [{
            line: number;
            name: string;
            keyword: string;
            steps: [{
                result: {
                    status: string;
                    error_message?: string;
                }
            }]
        }]
    }
    class cucumber extends test_runner {

        private test_result : string = '';

        constructor(cfg: debug_config, features: string|undefined){
            super(cfg);
            if (vscode.workspace.workspaceFolders) {
                // TODO refactor pushing default arguments
                if (features === undefined) {
                    super.add_argument("./features");
                } else {
                    super.add_argument(features);
                }
                super.add_argument('--publish-quiet');
                super.add_argument('--format');
                super.add_argument('json');
            } else {
                throw new Error("can't execute cucumber, no workspace folder is opened!");
            }
        }

        public async run_tests() {
            vscode.window.showInformationMessage('Starting tests, please wait.');
            if (this.config.program !== undefined) {
                await this.launch_program();
            } 
            return this.execute_cucumber();
        }

        // TODO rename parse_json_report
        public parse_json_report(tree_data: tree_view_data) {
            var json_report = JSON.parse(this.test_result) as cucumber_results[];
            json_report.forEach((feature) => {
                feature.elements.forEach((scenario) => {

                    var current_item = tree_data.get_scenario_by_uri_and_row(feature.uri, scenario.line);
                
                    if (scenario.steps.some((element) => element.result.status === 'failed')) {
                        current_item?.set_test_result(test_result.failed);
                    } 
                    else if (scenario.steps.some((element) => element.result.status === 'undefined')) {
                        current_item?.set_test_result(test_result.undefined);
                    } else {
                        current_item?.set_test_result(test_result.passed);
                    }
                });
            });
        }

        private launch_program() {
            var config = this.config;
            return new Promise(function (resolve, reject) {
                console.log("launching: " + config.program!);
                var runner = spawn(config.program!, {detached: false});
                runner.on('spawn', () => {
                    console.log(config.program + ' started!');
                    resolve(true);
                });
                runner.on('error', (code) =>{
                    console.log('error: ', code);
                    reject(code);
                });   
            });
        }

        private execute_cucumber() {
            var config = this.config;
            var args = this.get_args();
            var self = this;
            return new Promise(function (resolve, reject) {
                console.log("executing: " + config.command + ' ' + args);
                var runner = spawn(config.command , args , {detached: false, shell: true, cwd: config.cwd});
                runner.stdout.on('data', data => {
                    self.test_result = self.test_result.concat(data.toString());
                });
                runner.on('exit', (code) => {
                    console.log('cucumber exited with code ' + code);
                    resolve(code);
                });    
                runner.on('error', (code) => {
                    console.log('error: ' + code);
                    reject(code);
                })        
            });
        }
    }

}
import { Files } from '@cucumber/language-server'
import { FileSystemProvider, Uri, workspace } from 'vscode'

export class VscodeFiles implements Files {
  constructor(private readonly rootUri: string, private readonly provider: FileSystemProvider) {}

  async exists(uri: string): Promise<boolean> {
    try {
      await this.provider.stat(Uri.parse(uri))
      return true
    } catch {
      return false
    }
  }

  async findFiles(cwd: string, glob: string): Promise<readonly string[]> {
    const files = await workspace.findFiles(glob)
    return files.map((file) => file.path)
  }

  join(...paths: string[]): string {
    return Uri.joinPath(Uri.parse(this.rootUri), ...paths).path
  }

  async readFile(path: string): Promise<string> {
    const data = await this.provider.readFile(Uri.parse(path))
    return new TextDecoder().decode(data)
  }

  relative(uri: string): string {
    return uri
  }

  toUri(path: string): string {
    return path
  }
}

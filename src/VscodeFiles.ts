import { Files } from '@cucumber/language-server'
import { FileSystem, Uri, workspace } from 'vscode'

export class VscodeFiles implements Files {
  constructor(private readonly rootUri: string, private readonly fs: FileSystem) {}

  async exists(uri: string): Promise<boolean> {
    try {
      await this.fs.stat(Uri.parse(uri))
      return true
    } catch {
      return false
    }
  }

  async readFile(uri: string): Promise<string> {
    const data = await this.fs.readFile(Uri.parse(uri))
    return new TextDecoder().decode(data)
  }

  async findUris(glob: string): Promise<readonly string[]> {
    const uris = await workspace.findFiles(glob)
    return uris.map((file) => file.toString())
  }

  relativePath(uri: string): string {
    return workspace.asRelativePath(Uri.parse(uri), true)
  }
}

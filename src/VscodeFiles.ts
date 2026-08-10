import { Files } from '@cucumber/language-server'
import { FileSystem, Uri, workspace } from 'vscode'

export class VscodeFiles implements Files {
  constructor(private readonly fs: FileSystem) {}

  private shouldUnescapeBackslashes(): boolean {
    return workspace.getConfiguration('cucumber').get<boolean>('unescapeBackslashes', false)
  }

  private unescapeBackslashesInContent(content: string): string {
    if (this.shouldUnescapeBackslashes()) {
      return content.replace(/\\\\/g, '\\')
    }
    return content
  }

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
    const content = new TextDecoder().decode(data)
    return this.unescapeBackslashesInContent(content)
  }

  async findUris(glob: string): Promise<readonly string[]> {
    const uris = await workspace.findFiles(glob)
    return uris.map((file) => file.toString())
  }

  relativePath(uri: string): string {
    return workspace.asRelativePath(Uri.parse(uri), true)
  }
}

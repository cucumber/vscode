import assert from 'assert'
import * as vscode from 'vscode'
import { VscodeFiles } from '../../VscodeFiles'

suite('VscodeFiles Test Suite', () => {
  let mockFileSystem: vscode.FileSystem
  let testContent: Uint8Array

  setup(() => {
    // Create a mock file system
    mockFileSystem = vscode.workspace.fs
    // Create test content with escaped backslashes
    testContent = new TextEncoder().encode('const pattern = "\\\\/"')
  })

  test('readFile should not unescape backslashes when config is disabled (default)', async () => {
    // Mock workspace configuration to return false (default)
    const originalGetConfiguration = vscode.workspace.getConfiguration
    const mockGetConfiguration = () => ({
      get: <T>(key: string, defaultValue: T): T => {
        if (key === 'unescapeBackslashes') {
          return false as T
        }
        return defaultValue
      },
    }) as vscode.WorkspaceConfiguration

    // Temporarily replace getConfiguration
    ;(vscode.workspace as any).getConfiguration = mockGetConfiguration

    try {
      const vscodeFiles = new VscodeFiles(mockFileSystem)

      // Create a temporary file with escaped backslashes
      const testUri = vscode.Uri.file(
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '/test-file.js' || '/test-file.js'
      )

      // Write test content
      await vscode.workspace.fs.writeFile(testUri, testContent)

      // Read the file
      const content = await vscodeFiles.readFile(testUri.toString())

      // Content should remain unchanged (backslashes still escaped)
      assert.strictEqual(
        content.includes('\\\\/'),
        true,
        'Content should contain escaped backslashes when config is disabled'
      )

      // Clean up
      await vscode.workspace.fs.delete(testUri)
    } finally {
      // Restore original getConfiguration
      ;(vscode.workspace as any).getConfiguration = originalGetConfiguration
    }
  })

  test('readFile should unescape backslashes when config is enabled', async () => {
    // Mock workspace configuration to return true
    const originalGetConfiguration = vscode.workspace.getConfiguration
    const mockGetConfiguration = () => ({
      get: <T>(key: string, defaultValue: T): T => {
        if (key === 'unescapeBackslashes') {
          return true as T
        }
        return defaultValue
      },
    }) as vscode.WorkspaceConfiguration

    // Temporarily replace getConfiguration
    ;(vscode.workspace as any).getConfiguration = mockGetConfiguration

    try {
      const vscodeFiles = new VscodeFiles(mockFileSystem)

      // Create a temporary file with escaped backslashes
      const testUri = vscode.Uri.file(
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '/test-file.js' || '/test-file.js'
      )

      // Write test content with escaped backslashes
      const contentWithEscaped = new TextEncoder().encode('const pattern = "\\\\/"')
      await vscode.workspace.fs.writeFile(testUri, contentWithEscaped)

      // Read the file
      const content = await vscodeFiles.readFile(testUri.toString())

      // Content should have backslashes unescaped
      assert.strictEqual(
        content.includes('\\/'),
        true,
        'Content should contain unescaped backslash when config is enabled'
      )
      assert.strictEqual(
        content.includes('\\\\/'),
        false,
        'Content should not contain escaped backslashes when config is enabled'
      )

      // Clean up
      await vscode.workspace.fs.delete(testUri)
    } finally {
      // Restore original getConfiguration
      ;(vscode.workspace as any).getConfiguration = originalGetConfiguration
    }
  })

  test('readFile should handle multiple escaped backslashes', async () => {
    // Mock workspace configuration to return true
    const originalGetConfiguration = vscode.workspace.getConfiguration
    const mockGetConfiguration = () => ({
      get: <T>(key: string, defaultValue: T): T => {
        if (key === 'unescapeBackslashes') {
          return true as T
        }
        return defaultValue
      },
    }) as vscode.WorkspaceConfiguration

    ;(vscode.workspace as any).getConfiguration = mockGetConfiguration

    try {
      const vscodeFiles = new VscodeFiles(mockFileSystem)

      const testUri = vscode.Uri.file(
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '/test-file.js' || '/test-file.js'
      )

      // Write test content with multiple escaped backslashes
      const contentWithMultipleEscaped = new TextEncoder().encode(
        'const pattern1 = "\\\\/"; const pattern2 = "\\\\test\\\\path"'
      )
      await vscode.workspace.fs.writeFile(testUri, contentWithMultipleEscaped)

      const content = await vscodeFiles.readFile(testUri.toString())

      // All escaped backslashes should be unescaped
      assert.strictEqual(
        content.includes('\\/'),
        true,
        'Should unescape backslashes in pattern1'
      )
      assert.strictEqual(
        content.includes('\\test\\path'),
        true,
        'Should unescape backslashes in pattern2'
      )
      assert.strictEqual(
        content.includes('\\\\'),
        false,
        'Should not contain any escaped backslashes'
      )

      await vscode.workspace.fs.delete(testUri)
    } finally {
      ;(vscode.workspace as any).getConfiguration = originalGetConfiguration
    }
  })

  test('readFile should read config dynamically on each call', async () => {
    const originalGetConfiguration = vscode.workspace.getConfiguration
    let configValue = false

    const mockGetConfiguration = () => ({
      get: <T>(key: string, defaultValue: T): T => {
        if (key === 'unescapeBackslashes') {
          return configValue as T
        }
        return defaultValue
      },
    }) as vscode.WorkspaceConfiguration

    ;(vscode.workspace as any).getConfiguration = mockGetConfiguration

    try {
      const vscodeFiles = new VscodeFiles(mockFileSystem)

      const testUri = vscode.Uri.file(
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '/test-file.js' || '/test-file.js'
      )

      const contentWithEscaped = new TextEncoder().encode('const pattern = "\\\\/"')
      await vscode.workspace.fs.writeFile(testUri, contentWithEscaped)

      // First read with config disabled
      configValue = false
      let content = await vscodeFiles.readFile(testUri.toString())
      assert.strictEqual(
        content.includes('\\\\/'),
        true,
        'Should not unescape when config is false'
      )

      // Second read with config enabled (simulating config change)
      configValue = true
      content = await vscodeFiles.readFile(testUri.toString())
      assert.strictEqual(
        content.includes('\\/'),
        true,
        'Should unescape when config is true'
      )
      assert.strictEqual(
        content.includes('\\\\/'),
        false,
        'Should not contain escaped backslashes when config is true'
      )

      await vscode.workspace.fs.delete(testUri)
    } finally {
      ;(vscode.workspace as any).getConfiguration = originalGetConfiguration
    }
  })
})


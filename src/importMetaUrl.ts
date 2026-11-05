import { pathToFileURL } from 'node:url'

// Injected by esbuild to stand in for `import.meta.url` in ESM dependencies bundled as CommonJS
export const importMetaUrl = pathToFileURL(__filename).href

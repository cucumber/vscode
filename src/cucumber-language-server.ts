// eslint-disable-next-line @typescript-eslint/no-var-requires
const { startServer } = require('@cucumber/language-server')

const wasmUrls = {
  java: `${__dirname}/tree-sitter-java.wasm`,
  typescript: `${__dirname}/tree-sitter-typescript.wasm`,
}

startServer(wasmUrls)

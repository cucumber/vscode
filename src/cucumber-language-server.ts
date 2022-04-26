// eslint-disable-next-line @typescript-eslint/no-var-requires
const { startServer } = require('@cucumber/language-server')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { WasmParserAdapter } = require('@cucumber/language-service/wasm')
const adapter = new WasmParserAdapter()
adapter.init(__dirname).then(() => startServer(adapter))

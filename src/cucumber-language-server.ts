import { NodeFiles } from '@cucumber/language-server/node'
import { startWasmServer } from '@cucumber/language-server/wasm'

startWasmServer(__dirname, (rootUri) => new NodeFiles(rootUri))

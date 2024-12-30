import { timer } from "fluent-ms"
import { AwesomePluginsReadMe } from "$/collect/awesome/schemas"
import { safeTry, ok } from "neverthrow"

const main = timer("Parsing AwesomePlugins", () => safeTry(async function*() {
    const lines = yield* await AwesomePluginsReadMe.readTextLines()
    console.log('Got AwesomePlugins Readme lines:', lines)
    return ok(true)
}))

if (import.meta.url.endsWith(process.argv[1] ?? "")) {
    await main()
}

export default main

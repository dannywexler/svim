export function MUST(condition: unknown, message: string): asserts condition {
    if (!condition) {
        console.error("ERROR:")
        console.error(message)
        process.exit(1)
    }
}

export function ERR(...items: Array<unknown>) {
    console.error("ERROR:")
    console.error(...items)
    process.exit(1)
}

export function JPretty(jason: unknown) {
    return JSON.stringify(jason, null, 4)
}

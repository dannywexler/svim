import { timer } from "fluent-ms"
import { AwesomePluginsReadMe, isAwesomePlugin } from "$/collect/awesome/schemas"
import { safeTry, ok } from "neverthrow"
import { DB } from "$/lib/server/db/database"
import { MUST } from "$/logging"

const startSearchTerm = "## LSP"
const endSearchTerm = "## Preconfigured Configuration"

const programmingLangSupport = "Programming Languages Support"

const categoryMap = {
    Golang: { ft: "go", category: programmingLangSupport },
    YAML: { ft: "yaml", category: programmingLangSupport },
    PHP: { ft: "php", category: programmingLangSupport },
    "CSV Files": { ft: "csv", category: programmingLangSupport }
} as Record<string, { ft: string, category: string }>


const textToRemove = [
    "### (requires Neovim 0.5)",
    "#### LSP Installer",
    "### Tree-sitter Supported Colorscheme",
    "### Lua Colorscheme",
    "### Tree-sitter Based",
    "mini.nvim#",
    "/tree/main",
]

const pluginBlackList = [
    "anott03/nvim-lspinstall",
    "alexaandru/nvim-lspupdate"
]

const main = timer("Parsing AwesomePlugins", () => safeTry(async function*() {
    // const existingPlugins = await DB.Plugins.all()
    const rawAwesomePluginsText = yield* await AwesomePluginsReadMe.readText()
    const awesomePluginsText = cleanUp(rawAwesomePluginsText)
    const categorySections = awesomePluginsText.split("##").filter(item => !!item)
    // console.log('categorySections:', categorySections)
    let totalPluginsCount = 0
    for (const categorySection of categorySections) {
        let categoryLines = categorySection.split("\n")
        const firstItem = categoryLines.shift()
        MUST(firstItem, "Category section was missing a category")
        const category = firstItem.trim()
        console.group(category)
        categoryLines = categoryLines.filter(line => line.startsWith("- [") && line.includes("github.com"))
        let categoryCount = 0
        for (const categoryLine of categoryLines) {
            const pluginMatch = isAwesomePlugin(categoryLine)
            if (!pluginMatch) {
                console.log('ERROR parsing:\n', categoryLine)
                continue
            }
            categoryCount++
            const { owner, repo, description } = pluginMatch
            if (pluginBlackList.includes(`${owner}/${repo}`)) {
                continue
            }
            const info = categoryMap[category] ?? { category }
            console.log(owner, "/", repo, ":", description)

        }
        console.log("Found", categoryCount, category, "plugins")
        totalPluginsCount += categoryCount

        console.groupEnd()
    }
    return ok(true)
}))

function cleanUp(originalText: string) {
    const startSearchTermIndex = originalText.indexOf(startSearchTerm)
    MUST(startSearchTermIndex > 0, `Could not find ${startSearchTerm}!`)
    const endSearchTermIndex = originalText.lastIndexOf(endSearchTerm)
    MUST(endSearchTermIndex > 0, `Could not find ${endSearchTerm}!`)
    let cleanedText = originalText.slice(startSearchTermIndex, endSearchTermIndex)

    for (const toRemove of textToRemove) {
        cleanedText = cleanedText.replaceAll(toRemove, "")
    }
    cleanedText = cleanedText
        .replaceAll("####", "##")
        .replaceAll("###", "##")
        .replaceAll("ada0l/obsidian", "andvarfolomeev/obsidian")
    return cleanedText
}

if (import.meta.url.endsWith(process.argv[1] ?? "")) {
    await main()
}

export default main

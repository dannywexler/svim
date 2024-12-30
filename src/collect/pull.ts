import { timer } from "fluent-ms"
import { REPOS } from "$/collect/repos"
const repoFolders = Object.values(REPOS)

const main = timer(`Pulling ${repoFolders.length} repos`, async () => {
    for (const repoFolder of repoFolders) {
        await repoFolder.pull()
    }
})

if (import.meta.url.endsWith(process.argv[1] ?? "")) {
    await main()
}

export default main

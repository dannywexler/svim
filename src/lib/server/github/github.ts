import wretch from "wretch"
import { GitFolder } from "fluent-file"
import { FOLDERS } from "$/paths"
import { timer } from "fluent-ms"
import { GithubRepoStatsSchema, GithubResponseCase, type GithubRepoNotFound, type GithubRepoStatsResponse } from "./schemas"
import type { WretchError } from "wretch/resolver"

export const fetchRepoStats = timer(
    "Fetching GitHub repo stats",
    async (owner: string, repo: string): Promise<GithubRepoStatsResponse> => {
        const shortUrl = `${owner}/${repo}`
        console.log(shortUrl)
        return wretch("https://api.github.com/repos/")
            // .auth(`bearer ${ENV.GITHUB_TOKEN}`)
            .get(shortUrl)
            .notFound(() => {
                const notFound = {
                    case: GithubResponseCase.NotFound,
                    owner,
                    repo,
                } as const satisfies GithubRepoNotFound
                return notFound
            })
            .error(403, (err) => rateLimitHandler(err, owner, repo))
            .error(429, (err) => rateLimitHandler(err, owner, repo))
            .res(async (resp) => {
                parseGithubHeaders(resp)
                switch (resp.status) {
                    case 200: {
                        const json = await resp.json()
                        const parseRes = GithubRepoStatsSchema.safeParse(json)
                        if (parseRes.success) {
                            return {
                                case: GithubResponseCase.Success,
                                ...parseRes.data,
                            }
                        }
                        return {
                            case: GithubResponseCase.ParseError,
                            error: parseRes.error,
                        }
                    }
                    default: {
                        const msg = `Unknown reponse status: ${resp.status}`
                        console.error(msg)
                        throw new Error(msg, { cause: resp })
                    }
                }
            })
    }
)

export function gitRepo(owner: string, repo: string) {
    return new GitFolder({ owner, repo, onProgress: () => { } }, FOLDERS.REPOS)
}

export type OwnerAndRepo = {
    owner: string
    repo: string
}

const res = await fetchRepoStats("nvim-treesitter", "nvim-treesitte")
console.log('Fetch res:', res)

function rateLimitHandler(wretchError: WretchError, owner: string, repo: string) {
    console.log('Status:', wretchError.status, "Rate Limit Exceeded!")
    parseGithubHeaders(wretchError.response)
    return { owner, repo, case: GithubResponseCase.RateLimit }
}

function parseGithubHeaders(resp: Response) {
    const used = Number.parseInt(resp.headers.get("x-ratelimit-used") ?? "-1")
    const limit = Number.parseInt(resp.headers.get("x-ratelimit-limit") ?? "-1")
    const reset = new Date(Number.parseInt(resp.headers.get("x-ratelimit-reset") ?? "0") * 1000).toLocaleTimeString()
    console.log('Used', used, "of", limit, "requests until", reset)
    return { used, limit, reset }
}

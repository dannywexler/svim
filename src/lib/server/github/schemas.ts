import { ms } from "fluent-ms"
import { z, type ZodError } from "zod"
export const GithubRepoStatsSchema = z.object({
    archived: z.boolean(),
    created_at: z.coerce.date(),
    default_branch: z.string(),
    description: z.string().or(z.null()),
    language: z.string(),
    pushed_at: z.coerce.date(),
    stargazers_count: z.number(),
    updated_at: z.coerce.date(),
}).transform(({
    archived,
    created_at,
    default_branch,
    description,
    language,
    pushed_at,
    stargazers_count,
    updated_at,
}) => {
    const maxUp = Math.max(updated_at.getTime(), pushed_at.getTime())
    return {
        archived,
        branch: default_branch,
        createdOn: created_at,
        description,
        language,
        stars: stargazers_count,
        updatedOn: ms(maxUp),
    }
})
export type GithubRepoStats = z.infer<typeof GithubRepoStatsSchema>

export enum GithubResponseCase {
    Success = "Success",
    ParseError = "ParseError",
    NotFound = "NotFound",
    RateLimit = "RateLimit",
}

export type GithubRepoStatsSuccess = GithubRepoStats & { case: GithubResponseCase.Success }
export type GithubRepoStatsParseError = { case: GithubResponseCase.ParseError, error: ZodError }
export type GithubRepoNotFound = {
    case: GithubResponseCase.NotFound
    owner: string
    repo: string
}
export type GithubRepoRateLimit = {
    case: GithubResponseCase.RateLimit
    owner: string
    repo: string
}

export type GithubRepoStatsResponse =
    | GithubRepoStatsSuccess
    | GithubRepoStatsParseError
    | GithubRepoNotFound
    | GithubRepoRateLimit

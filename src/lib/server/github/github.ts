import { GitFolder } from "fluent-file"
import { FOLDERS } from "$/paths"


export function gitRepo(owner: string, repo: string) {
    return new GitFolder({ owner, repo, onProgress: () => { } }, FOLDERS.REPOS)
}

export type OwnerAndRepo = {
    owner: string
    repo: string
}


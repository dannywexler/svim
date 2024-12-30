import { folder } from "fluent-file"

const SRC = folder(import.meta.dirname)
const REPOS = SRC.subFolder("repos")

export const FOLDERS = {
    SRC,
    REPOS
}


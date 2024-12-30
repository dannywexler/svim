import { parseEnv } from "znv";
import { z } from "zod"

export const ENV = parseEnv(process.env, {
    GITHUB_TOKEN: z.string()
})

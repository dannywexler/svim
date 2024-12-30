import { z } from "zod"
import { REPOS } from "$/collect/repos";
import { capitalize, StringSchema } from "$/lib/utils/normalize";
import { zodRegex } from "zodregex";

export const AwesomePluginsReadMe = REPOS.AwesomePlugins.getReadMe()

const pluginInfoSchema = z.object({
    owner: StringSchema,
    repo: StringSchema,
    description: StringSchema.transform((og) => capitalize(og.trim())),
})

const miniPluginInfoRegex = /- \[(?<owner>echasnovski)\/(?<repo>[\w\.-]+)\]\(.*\) -\s+(?<description>.*)/
const awesomePluginInfoRegex = /https?:\/\/github\.com\/(?<owner>[\w\.-]+)\/(?<repo>[\w\.-]+)\S+ -\s+(?<description>.+)$/

export const isAwesomePlugin = zodRegex(
    pluginInfoSchema,
    miniPluginInfoRegex,
    awesomePluginInfoRegex
)

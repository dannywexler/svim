import { z } from "zod";

export const ALL = "ALL"

export const notLetterOrNumberRegex = /[^a-z0-9]+/g

export function normalizeToOnlyLetters(input: string) {
    return input.toLowerCase().replace(notLetterOrNumberRegex, "")
}

export function normalizeToUnderscores(input: string) {
    return input
        .toLowerCase()
        // The "c" in 1с:enterprise is not a regular c, so replace it
        .replaceAll("с", "c")
        .replace(/\W+/g, "_")
}

export function capitalize(input: string) {
    return input.slice(0, 1).toUpperCase() + input.slice(1)
}

export function mergeAndSort<T>(firstArray: Array<T>, secondArray: Array<T>) {
    const combined = firstArray.concat(secondArray)
    const set = new Set(combined)
    return [...set].filter(item => !!item).sort()
}

export type Rec<T> = Record<string, T>

export const StringSchema = z.string()
export const OptionalStringSchema = z.string().optional()

export const StringRecordSchema = z.record(z.string())

export type StringRecord = z.infer<typeof StringRecordSchema>

export const StringArraySchema = z.string().array()
export type StringArray = z.infer<typeof StringArraySchema>

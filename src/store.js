import { writable } from 'svelte/store'

export const CurrentPath = writable("")
export const Rates = writable([])
export const ScrapCodes = writable([])
export const FailureCodes = writable([])
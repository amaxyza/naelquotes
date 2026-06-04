import quotes from './quotes'

// Every distinct tag found across all quotes, sorted. Derived from the data so
// the filter UI stays in sync automatically as tags are added/changed.
export const ALL_TAGS = [...new Set(quotes.flatMap((q) => q.tags ?? []))].sort()

// Display label for a tag (e.g. "adds" -> "Adds").
export const tagLabel = (tag) => tag.charAt(0).toUpperCase() + tag.slice(1)

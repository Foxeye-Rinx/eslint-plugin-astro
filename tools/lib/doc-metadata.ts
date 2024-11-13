/* This file is metadata for rendering rules docs */

import type { RuleCategory, RuleModule } from "src/types"
import { rules } from "../../src/rules"

export const categories: RuleCategory[] = [
  "Possible Errors",
  "Security Vulnerability",
  "Best Practices",
  "Stylistic Issues",
  "A11Y Extension Rules",
  "Extension Rules",
  "System",
] as const

export const descriptions: Record<RuleCategory, string> = {
  "Possible Errors":
    "These rules relate to possible syntax or logic errors in Astro component code:",
  "Security Vulnerability":
    "These rules relate to security vulnerabilities in Astro component code:",
  "Best Practices":
    "These rules relate to better ways of doing things to help you avoid problems:",
  "Stylistic Issues":
    "These rules relate to style guidelines, and are therefore quite subjective:",
  "A11Y Extension Rules":
    "These rules extend the rules provided by [eslint-plugin-jsx-a11y] to work well in Astro component:  \n(You need to install [eslint-plugin-jsx-a11y] to use the rules.)",
  "Extension Rules":
    "These rules extend the rules provided by ESLint itself to work well in Astro component:",
  System: "These rules relate to this plugin works:",
}

export type RulesGroupByCategory = {
  cat: RuleCategory
  description: string
  rules: RuleModule[]
}
export const activeRules = rules.filter((rule) => !rule.meta.deprecated)
export const deprecatedRules = rules.filter((rule) => rule.meta.deprecated)
export const categoryRules: RulesGroupByCategory[] = categories.map((cat) => {
  return {
    cat,
    description: descriptions[cat],
    rules: activeRules.filter((rule) => rule.meta.docs.category === cat),
  }
})
activeRules.forEach((rule) => {
  if (!categories.includes(rule.meta.docs.category)) {
    throw new Error(`missing categories:${rule.meta.docs.category}`)
  }
})

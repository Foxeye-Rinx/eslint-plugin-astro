// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair -- ignore
/* eslint-disable func-style -- Arrow functions are better when returning string */
import type { RuleModule } from "../src/types"
import type { RulesGroupByCategory } from "./lib/doc-metadata"
import { deprecatedRules, categoryRules } from "./lib/doc-metadata"

const buildDefaultRulePath = (ruleName: string) => `./rules/${ruleName}.md`
type BuildRulePathFunc = typeof buildDefaultRulePath

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
function toRuleRow(rule: RuleModule, buildRulePath: BuildRulePathFunc) {
  const recommendedMark = rule.meta.docs.recommended ? "⭐" : ""
  const fixableMark = rule.meta.fixable ? "🔧" : ""
  const deprecatedMark = rule.meta.deprecated ? "⚠️" : ""
  const mark = recommendedMark + fixableMark + deprecatedMark
  const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
    rule.meta.docs.ruleName || "",
  )})`
  const description = rule.meta.docs.description || "(no description)"

  return `| ${link} | ${description} | ${mark} |`
}

/**
 *
 */
function toTableRows(rules: RuleModule[], buildRulePath: BuildRulePathFunc) {
  return rules.map((rule) => toRuleRow(rule, buildRulePath)).join("\n")
}

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
function toDeprecatedRuleRow(
  rule: RuleModule,
  buildRulePath: BuildRulePathFunc,
) {
  const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
    rule.meta.docs.ruleName || "",
  )})`
  const replacedRules = rule.meta.replacedBy || []
  const replacedBy = replacedRules
    .map((name) => `[astro/${name}](${buildRulePath(name)})`)
    .join(", ")

  return `| ${link} | ${replacedBy || "(no replacement)"} |`
}

const tableHeader = `
| Rule ID | Description |    |
|:--------|:------------|:---|`

const toTable = (
  { cat, description, rules }: RulesGroupByCategory,
  buildRulePath: BuildRulePathFunc,
) => `
## ${cat}

${description}
${tableHeader}
${toTableRows(rules, buildRulePath)}
`
const deprecatedTable = (buildRulePath: BuildRulePathFunc) => `
## Deprecated

- ⚠️ We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.
- 😇 We don't fix bugs which are in deprecated rules since we don't have enough resources.

${tableHeader}
${deprecatedRules.map((rule) => toDeprecatedRuleRow(rule, buildRulePath)).join("\n")}
`

const noRulesTableContent = `
*No rules have been provided yet.*
`

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
export default function renderRulesTableContent(
  buildRulePath = buildDefaultRulePath,
): string {
  let rulesTableContent = categoryRules
    .filter((cat) => cat.rules.length)
    .map((cat) => toTable(cat, buildRulePath))
    .join("")

  if (deprecatedRules.length >= 1) {
    rulesTableContent += deprecatedTable(buildRulePath)
  }
  if (!rulesTableContent.trim()) {
    return noRulesTableContent
  }
  return rulesTableContent
}

import type { RuleContext, RuleListener } from "../types"
import jsxA11y from "eslint-plugin-jsx-a11y"
import type { ESLint, Linter } from "eslint"

export type PluginRuleModule = {
  meta?: {
    docs?: {
      url?: string
    }
    messages?: never
    schema?: never
    type?: never
    fixable?: never
    deprecated?: boolean
  }
  create: (context: RuleContext) => RuleListener
}

export type PluginJsxA11y = ESLint.Plugin & {
  configs: {
    recommended: Linter.LegacyConfig
    strict: Linter.LegacyConfig
  }
  flatConfigs: {
    recommended: Linter.Config
    strict: Linter.Config
  }
}
/**
 * Load `eslint-plugin-jsx-a11y` from the user local.
 */
export function getPluginJsxA11y(): PluginJsxA11y {
  return jsxA11y
}

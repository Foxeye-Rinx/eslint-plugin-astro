// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import type { RuleModule } from "../types"
import missingClientOnlyDirectiveValue from "../rules/missing-client-only-directive-value"
import noConflictSetDirectives from "../rules/no-conflict-set-directives"
import noDeprecatedAstroCanonicalurl from "../rules/no-deprecated-astro-canonicalurl"
import noDeprecatedAstroFetchcontent from "../rules/no-deprecated-astro-fetchcontent"
import noDeprecatedAstroResolve from "../rules/no-deprecated-astro-resolve"
import noDeprecatedGetentrybyslug from "../rules/no-deprecated-getentrybyslug"
import noExportsFromComponents from "../rules/no-exports-from-components"
import noSetHtmlDirective from "../rules/no-set-html-directive"
import noSetTextDirective from "../rules/no-set-text-directive"
import noUnusedCssSelector from "../rules/no-unused-css-selector"
import noUnusedDefineVarsInStyle from "../rules/no-unused-define-vars-in-style"
import preferClassListDirective from "../rules/prefer-class-list-directive"
import preferObjectClassList from "../rules/prefer-object-class-list"
import preferSplitClassList from "../rules/prefer-split-class-list"
import semi from "../rules/semi"
import sortAttributes from "../rules/sort-attributes"
import validCompile from "../rules/valid-compile"
import { buildA11yRules } from "../a11y"

export const rules = [
  missingClientOnlyDirectiveValue,
  noConflictSetDirectives,
  noDeprecatedAstroCanonicalurl,
  noDeprecatedAstroFetchcontent,
  noDeprecatedAstroResolve,
  noDeprecatedGetentrybyslug,
  noExportsFromComponents,
  noSetHtmlDirective,
  noSetTextDirective,
  noUnusedCssSelector,
  noUnusedDefineVarsInStyle,
  preferClassListDirective,
  preferObjectClassList,
  preferSplitClassList,
  semi,
  sortAttributes,
  validCompile,
  ...buildA11yRules(),
] as RuleModule[]

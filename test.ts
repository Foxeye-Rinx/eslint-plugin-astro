import { getPluginJsxA11y } from "./src/a11y/load.ts"
import jsxA11y from "eslint-plugin-jsx-a11y"
import { isEqual } from "es-toolkit"
import { createLinterConfig } from "./docs-build/src/components/eslint/scripts/linter.mts"

const a = getPluginJsxA11y()
const b = jsxA11y
const c = isEqual(a, b)
const d = await createLinterConfig()
console.log(d)
console.log(c)

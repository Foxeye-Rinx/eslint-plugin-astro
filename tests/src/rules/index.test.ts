import { readdirSync } from "fs"
import { join } from "path"
import assert from "assert"
import { rules } from "../../../src/rules/index"

describe("src/rules/index.ts", () => {
  it("should import all rule files", () => {
    const rulesDir = join(__dirname, "../../../src/rules")
    const ruleFiles = readdirSync(rulesDir)
      .filter(
        (file) =>
          file.endsWith(".ts") &&
          file !== "index.ts" &&
          !file.endsWith(".test.ts"),
      )
      .map((file) => file.replace(".ts", ""))

    const importedRules = rules.map((rule) => rule.meta.docs.ruleName)
    assert.deepStrictEqual(importedRules.sort(), ruleFiles.sort())
  })
})

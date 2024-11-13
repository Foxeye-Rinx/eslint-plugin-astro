// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import netlify from "@astrojs/netlify"
import { categoryRules } from "../tools/lib/doc-metadata"

/** @typedef {{label: string, items: Array<string>}} SideBarGroup */
/** @type {SideBarGroup[]} */
const groups = categoryRules
  .map((groupObj) => ({
    label: groupObj.cat,
    items: groupObj.rules.map((rule) => `rules/${rule.meta.docs.ruleName}`),
  }))
  .filter(({ items }) => items.length > 0)

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "eslint-plugin-astro",
      logo: {
        src: "./src/assets/astro-logo.svg",
      },
      social: {
        github: "https://github.com/ota-meshi/eslint-plugin-astro",
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        { slug: "user-guide" },
        { slug: "rules" },
        {
          label: "Rules Reference",
          items: groups,
        },
      ],
    }),
  ],
  output: "server",
  adapter: netlify(),
})

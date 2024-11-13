// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import netlify from "@astrojs/netlify"
import { categoryRules } from "../tools/lib/doc-metadata"

// import fs from "node:fs/promises"
// import { createHash } from "node:crypto"
// import { createReadStream } from "node:fs"
// import path from "node:path"

// /**
//  * Gets SHA1 hash of a file
//  * @param {string} filePath - Path to the file to hash
//  * @returns {Promise<string>} Hex string of SHA1 hash
//  */
// function getFileHash(filePath) {
//   return new Promise((resolve, reject) => {
//     const hash = createHash("sha1")
//     const stream = createReadStream(filePath)
//     stream.on("error", (err) => reject(err))
//     stream.on("data", (chunk) => hash.update(chunk))
//     stream.on("end", () => resolve(hash.digest("hex")))
//   })
// }

// /**
//  * Copies a file from source to target path, skipping if target exists with same content
//  * @param {string} sourcePath - Path to source file
//  * @param {string} targetPath - Path to target file
//  */
// async function copyFileAndSkipExistingFiles(sourcePath, targetPath) {
//   try {
//     // Check if target exists
//     const targetExists = await fs
//       .access(targetPath)
//       .then(() => true)
//       .catch(() => false)

//     if (targetExists) {
//       // Compare hashes if target exists
//       const [sourceHash, targetHash] = await Promise.all([
//         getFileHash(sourcePath),
//         getFileHash(targetPath),
//       ])

//       // Skip if hashes match
//       if (sourceHash === targetHash) {
//         return
//       }
//     }

//     // eslint-disable-next-line consistent-return -- ignore
//     return fs.copyFile(sourcePath, targetPath)
//   } catch (error) {
//     // eslint-disable-next-line no-console -- ignore
//     console.error(`Error processing ${sourcePath}:`, error)
//   }
// }

// /**
//  * Copies rule files from source to target directory
//  * @param {string[]} exclude - Array of filenames to exclude from copying
//  */
// async function copyRuleFiles(exclude = []) {
//   const sourceDir = "../src/rules"
//   const targetDir = "./src/content/docs/rules"

//   // Ensure target directory exists
//   await fs.mkdir(targetDir, { recursive: true })

//   // Read all files from source directory
//   const files = await fs.readdir(sourceDir)

//   // Filter excluded files and create copy promises
//   const copyPromises = files
//     .filter((file) => !exclude.includes(file))
//     .map((file) => {
//       const sourcePath = path.join(sourceDir, file)
//       const targetPath = path.join(targetDir, file)
//       return copyFileAndSkipExistingFiles(sourcePath, targetPath)
//     })

//   // Wait for all operations to complete
//   await Promise.all(copyPromises)
// }

// // Example usage:
// await copyRuleFiles(["index.ts"])

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

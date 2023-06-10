import path from "node:path"
import fs from "node:fs"
import ts from "rollup-plugin-typescript2"
import cjs from "@rollup/plugin-commonjs"

const pkgPath = path.resolve(__dirname, "../../packages")
const distPath = path.resolve(__dirname, "../../dist/node_modules")

export const resolvePkgPath = (pkgName: string, isDist = false) => {
  if (isDist) {
    return `${distPath}/${pkgName}`
  }

  return `${pkgPath}/${pkgName}`
}

export const getPackageJSON = (pkgName: string) => {
  const pkgJsonPath = `${resolvePkgPath(pkgName)}/package.json`
  const str = fs.readFileSync(pkgJsonPath, { encoding: "utf-8" })
  return JSON.parse(str)
}

export const getBaseRollupPlugins = ({ tsConfig = {} } = {}) => {
  return [cjs(), ts(tsConfig)]
}

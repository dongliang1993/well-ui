import clear from "rollup-plugin-clear";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import analyze from "rollup-plugin-analyzer";
import postcss from "rollup-plugin-postcss";

import fs from "fs";
const pkg = JSON.parse(fs.readFileSync("./package.json"));
const external = Object.keys(pkg.dependencies || {});
const external2 = Object.keys(pkg.peerDependencies || {});

const extensions = [".js", ".ts", ".tsx", ".jsx"];

module.exports = {
  input: ["./packages/index.tsx"],
  output: [
    {
      dir: "./lib",
      format: "cjs",
      preserveModules: true,
      exports: "named",
      assetFileNames: "[name][extname]",
    },
    {
      dir: "./es",
      format: "es",
      preserveModules: true,
      exports: "named",
      assetFileNames: "[name][extname]",
    },
  ],
  external: (id) => {
    return external.concat(external2).find((item) => id.includes(item));
  },
  plugins: [
    clear({
      targets: ["lib", "es"],
    }),
    resolve({ extensions }),
    commonjs(),
    postcss({
      extract: true,
      namedExports: true,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions,
    }),
    analyze(),
  ],
};

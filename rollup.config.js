import clear from "rollup-plugin-clear";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import analyze from "rollup-plugin-analyzer";
// import autoExternal from "rollup-plugin-auto-external";
import fs from "fs";
const pkg = JSON.parse(fs.readFileSync("./package.json"));
const external = Object.keys(pkg.dependencies || {});

const extensions = [".js", ".ts"];

module.exports = {
  input: ["./src/index.ts"],
  output: [
    {
      dir: "./lib",
      format: "cjs",
      preserveModules: true,
      exports: "named",
    },
    {
      dir: "./es",
      format: "es",
      preserveModules: true,
      exports: "named",
    },
  ],
  external: (id) => {
    return external.find((item) => id.includes(item));
  },
  plugins: [
    clear({
      targets: ["lib", "es"],
    }),
    resolve({ extensions }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions,
    }),
    analyze(),
  ],
};

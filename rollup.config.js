// import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import analyze from "rollup-plugin-analyzer";
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
    },
    {
      dir: "./es",
      format: "es",
      preserveModules: true,
      exports: "named",
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
    // TODO: 没必要使用 ts 编译，只是想用 tsc 生成 .d.ts
    // typescript({
    //   tsconfig: "./tsconfig.json",
    // }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions,
    }),
    analyze(),
  ],
};

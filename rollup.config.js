import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import { string } from "rollup-plugin-string";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

console.log("process.env: ");
console.log(process.env);

const prod = process.env.PROD === "true";
const buildType = process.env.BUILD_TYPE;
const version = process.env.VERSION;
let i, s, o, n;

switch (buildType) {
  case "client":
    i = "src/client/main.ts";
    s = "src/client/";
    o = prod ? `dist/${process.env.VERSION}/` : `public/staging/`;
    n = prod ? `cs1-client.min.js` : `cs1-client.js`;
    break;
  case "app":
    i = "src/app/main.ts";
    s = "src/app/";
    o = prod ? `dist/${process.env.VERSION}/cs1-app.min.js` : `public/staging/`;
    n = prod ? `cs1-app.min.js` : `cs1-app.js`;
    break;
  case "socket":
    i = "src/engine/modules/socket.js";
    s = "src/engine/modules";
    o = prod ? `dist/${process.env.VERSION}/` : `public/staging/`;
    n = prod ? `cs1-socket.min.js` : `cs1-socket.js`;
    break;
}

console.log("prod: ", prod);
console.log("buildType: ", buildType);
console.log("version: ", version);
console.log("i: ", i);
console.log(`o:  ${o}${n}`);

export default {
  input: i,
  output: {
    dir: o,
    entryFileNames: n,
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: buildType == "app" || !prod,
    name: "CS1",
  },
  plugins: [
    typescript({
      tsconfig: false,
      filterRoot: s,
      target: "esnext",
    }),
    nodeResolve({
      browser: true
    }),
    commonjs(),
    ,
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    json(),
    string({
      // Required to be specified
      include: "**/*.html",

      // Undefined by default
      exclude: ["**/index.html"],
    }),
    css({ output: "public/bundle.css" }),
    //resolve(), // tells Rollup how to find date-fns in node_modules
    //cleanup({comments: 'none'}),
    prod && terser(), // minify, but only in production
  ],
};

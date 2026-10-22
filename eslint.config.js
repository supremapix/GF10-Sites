import js from "@eslint/js";
import ts from "typescript-eslint";
export default [
  {
    ignores: ["dist/**", "node_modules/**", "assets/**", "public/**", "tmp/**"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        Buffer: "readonly",
        process: "readonly",
        URL: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];

import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: [
      "__tests__/**",
      "**/node_modules/**",
      "android/**",
      "ios/**",
      "build/**",
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        require: true,
        module: true,
        __dirname: true,
        console: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-require-imports": "off",
      "prettier/prettier": "error",
    },
  },
];

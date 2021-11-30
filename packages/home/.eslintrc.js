module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    settings: {
      "import/resolver": "webpack",
    },
    parser: "@typescript-eslint/parser",
    extends: [
      "plugin:react/recommended",
      "airbnb",
      "airbnb-typescript",
      "prettier",
    ],
    parserOptions: {
      tsconfigRootDir: __dirname,
      sourceType: "module",
      project: ["./tsconfig.eslint.json"],
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "import/prefer-default-export": "off",
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "react/function-component-definition": "off",
    },
  };
  
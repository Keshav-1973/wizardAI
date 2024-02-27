module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          tests: ["./tests/"],
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@config": "./src/config",
          "@constants": "./src/constants",
          "@helpers": "./src/helpers",
          "@navigations": "./src/navigations",
          "@screens": "./src/screens",
          "@themes": "./src/Themes",
        },
      },
    ],
  ],
};

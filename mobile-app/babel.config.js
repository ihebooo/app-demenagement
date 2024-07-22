module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            "@assets": "./src/assets",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@helpers": "./src/helpers",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@styles": "./src/styles",
          },
        },
      ],
    ],
  };
};

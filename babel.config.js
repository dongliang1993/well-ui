module.exports = (api) => {
  const config = {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "usage",
          corejs: 3,
          targets: api.env("test")
            ? { node: "current" }
            : {
                browsers: [
                  "last 2 versions",
                  "Firefox ESR",
                  "> 1%",
                  "ie >= 11",
                ],
              },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
    ],
  };

  return config;
};

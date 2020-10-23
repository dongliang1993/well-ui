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
            : { browsers: ["Android >= 4.4", "iOS >= 10"] },
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
    ],
  };

  api.cache(false);

  return config;
};

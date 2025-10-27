// karma.conf.cjs
const path = require("path");

module.exports = function (config) {
  config.set({
    // === Framework principal ===
    frameworks: ["jasmine"],

    // === Archivos de prueba ===
    files: ["src/tests/**/*.spec.js"],

    // === Preprocesadores (para transpilar JSX con Babel) ===
    preprocessors: {
      "src/tests/**/*.spec.js": ["webpack"]
    },

    // === Webpack + Babel ===
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      }
    },

    // === Plugins cargados manualmente ===
    plugins: [
      require.resolve("karma-jasmine"),
      require.resolve("karma-webpack"),
      require.resolve("karma-chrome-launcher"),
      require.resolve("karma-edge-launcher")
    ],

    // === Navegadores ===
    browsers: ["ChromeCustom", "Edge"],
    customLaunchers: {
      ChromeCustom: {
        base: "Chrome",
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-extensions",
          "--remote-debugging-port=9222"
        ]
      }
    },

    // === Reportes y logs ===
    reporters: ["progress"],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  });

  console.log("✅ Karma configurado correctamente. Chrome en:",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  );
};

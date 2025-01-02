const { defineConfig } = require("cypress");
//const { initPlugin: initMetamaskPlugin } = require("cypress-metamask");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //initMetamaskPlugin(on, config);
      return config;
    },
    baseUrl: "http://localhost:5173",
  },
});

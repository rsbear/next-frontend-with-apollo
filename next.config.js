// module.exports = {
//   webpack: config => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty'
//     }

//     return config
//   }
// }

// const withStylus = require("@zeit/next-stylus");
const withImages = require("next-images");
// const withSass = require("@zeit/next-sass");
const compose = require("next-compose");

module.exports = compose([
  [withImages],
  {
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty"
      };

      return config;
    }
  }
]);

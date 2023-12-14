// const path = require(path);

// module.exports = {
//     webpack: {
//         alias: {
//             fs: "css/lib/stringify",
//         },
//     },
// };

// craco.config.js
module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  webpack: {
    alias: {
      fs: 'css/lib/stringify',
    },
    mode: 'extends',
    configure: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
        ],
      },
      ignoreWarnings: [/Failed to parse source map/],
    },
  },
};

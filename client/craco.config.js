const path = require('path');
const fs = require('fs');

module.exports = {
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.https = true; // Enable HTTPS

    // Provide SSL certificate and key if available
    const sslCertPath = path.resolve(__dirname, 'localhost.crt');
    const sslKeyPath = path.resolve(__dirname, 'localhost-privateKey.key');

    if (fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath)) {
      devServerConfig.https = {
        cert: fs.readFileSync(sslCertPath),
        key: fs.readFileSync(sslKeyPath),
      };
    } else {
      console.error(
        'SSL certificate or key not found. HTTPS will be used with a self-signed certificate.'
      );
    }

    return devServerConfig;
  },
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

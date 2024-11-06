//works only in linux

module.exports = {
  apps: [
    {
      name: "React Caspar Client",
      script: "npm",
      args: "start",
      env: {
        HTTPS: "true",
        SSL_CRT_FILE: "./cert.crt",
        SSL_KEY_FILE: "./cert.key",
        PORT: "10000",
        NODE_ENV: "development",
      },
    },
  ],
};
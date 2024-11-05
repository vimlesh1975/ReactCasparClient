module.exports = {
  apps: [{
    name: "RCC Client",
    script: "serve",
    args: "-s build", // Serve the 'build' directory
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production"
    }
  }]
};
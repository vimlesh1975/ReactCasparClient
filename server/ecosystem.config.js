module.exports = {
  apps: [{
    name: "RCC Server",
    script: "./main.js",
    instances: 1,  // Use 4 instances
    watch: true,   // Enable watch mode to restart on file changes
    max_memory_restart: "1G",  // Auto-restart if the app uses more than 1GB of memory
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}

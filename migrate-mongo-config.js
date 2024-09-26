const config = {
  mongodb: {
    // MongoDB connection URL
    url: "mongodb://localhost:27017",

    // Your database name
    databaseName: "Codezy",

    options: {
      // You can safely remove deprecated options like useNewUrlParser and useUnifiedTopology
      // If needed, you can uncomment the timeout options below
      // connectTimeoutMS: 3600000, 
      // socketTimeoutMS: 3600000, 
    }
  },

  // Migrations directory
  migrationsDir: "migrations",

  // MongoDB collection to track applied changes
  changelogCollectionName: "changelog",

  // Migration file extension
  migrationFileExtension: ".js",

  // Disable file hashing
  useFileHash: false,

  // Use CommonJS module system
  moduleSystem: 'commonjs',
};

export default config;

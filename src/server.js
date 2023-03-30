const app = require('./app');
const { connectToDatabase } = require('./db/connection');
require('dotenv').config();

const { SERVER_PORT = 8001, DB_URL } = process.env;

const start = async () => {
  try {
    await connectToDatabase(DB_URL);
    console.log('Database connection successful');

    app.listen(SERVER_PORT, () => {
      console.log(`Server running. Use our API on port: ${SERVER_PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

start();

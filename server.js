// server.js
const app = require("./app");

const createDatabase = require('./src/database/dbCreation');
const setupDatabase = require('./src/database/dbSetup');
const dataInjections = require('./src/database/dbInject');

require("dotenv").config();

const { PORT } = process.env;

const initServer = async () => {
  try {
    const isNewDatabase = await createDatabase();
    if (isNewDatabase) {
      await setupDatabase();
      await dataInjections();
    }

    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while initializing the server: ", error);
    process.exit(1);
  }
};

initServer();

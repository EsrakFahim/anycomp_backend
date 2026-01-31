// import app from './app';

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import "dotenv/config";
import { AppDataSource } from "./data-source";
console.log('Connected DB:', AppDataSource.options.database);
console.log(
  'Loaded entities:',
  AppDataSource.entityMetadatas.map(e => e.tableName)
);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
import app from "./app";
import { configData } from "./config";

import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(configData.database_url as string);
    app.listen(configData.port, () => {
      console.log("Server is listening on PORT " + configData.port);
    });
  } catch (err) {
    console.log(err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();

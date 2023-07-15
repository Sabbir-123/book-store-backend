/* eslint-disable no-undef */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception deteced", err);
  process.exit(1);
});
let server: Server;
async function prod() {
  try {
    await mongoose.connect(config.db as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(" 🛢️ Connected to database");
    server = app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect", err);
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

prod();

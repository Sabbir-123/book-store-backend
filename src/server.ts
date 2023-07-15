import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function prod() {
  try {
    await mongoose.connect(config.db as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(" 🛢️ Connected to database");
    app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect", err);
  }
}

prod();

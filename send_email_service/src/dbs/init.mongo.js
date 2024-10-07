"use strict";
const mongoose = require("mongoose");
const connectString = `mongodb://localhost:27108/sso-app`;
mongoose
  .connect(connectString)
  .then((_) => console.log("Connect mongodb success"))
  .catch((err) => console.log("Error connect!"));

//dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;

const mongoose = require("mongoose");
const signup = require("./signup.route");
const { Schema } = mongoose;

let user = new Schema(
  {
    First_name: { type: String },
    Last_name: { type: String },
    Email: { type: String },
    User_name: { type: String },
    Password: { type: String },
  },
  {
    collection: "Authentication",
  }
);

module.exports = mongoose.model("Authentication", user);

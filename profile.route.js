const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const signup = require("./signup.module");

const app = express();

// Middleware to parse json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Peofile get API
Router.get("/profile/:User_name", async (req, res) => {
  try {
    const { User_name } = req.params;

    const user = await signup.findOne({ User_name });

    if (!User_name) {
      return res.status(400).json({ massage: "User not found" });
    }

    const userProfile = {
      First_name: user.First_name,
      Last_name: user.Last_name,
      Email: user.Email,
      User_name: user.User_name,
    };
    res.json(userProfile);
  } catch (err) {
    console.error("Error in getting user profile:", err);
    res.status(500).json({ massage: " Error in getting user profile", error: err });
  }
});

module.exports = Router;

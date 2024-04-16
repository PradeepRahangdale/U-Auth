const express = require("express");
const Router = express.Router();
const bodyParser = require("body-parser");
const signup = require("./signup.module");
const signupModule = require("./signup.module");
const app = express();

// middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login APIs
Router.post("/login", async (req, res) => {
  const { User_name, Password } = req.body;
  try {
    if (!User_name || !Password) {
      return res.status(400).json({ massage: "User-name and password are required"});
    }
    const user = await signup.findOne({ User_name });
    if (!user) {
      return res.json({ massage: "user not found"});
    }
    if (Password !== user.Password) {
      return res.status(401).json({ massage:"invaild password"});
    }

    res
      .status(200)
      .json({ massage:"login succesful", User_name:user.User_name,status:200 });
  } catch (err) {
    // console.error('Error saying user to database:', err);
    res.status(500).json({ massage:"can not login", error: err });
  }
});

module.exports = Router;

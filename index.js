const express = require("express");
const mongoose = require('mongoose' );
const bodyParser = require('body-parser');
const config = require('./DB');
const app = express();
const port = 3000;
const signup = require ('./signup.route');
const login = require('./login.route');
const profile = require ('./profile.route');
const cors = require('cors');
// const axios = require("")




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/',signup);
app.use('/',login);
app.use('/',profile);


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Database is connected ' + config.DB);
});

mongoose.connection.on('error', (err) => {
  console.log('Cannot connect to the database ' + err);
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

module.exports= app;
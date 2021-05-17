const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Common Response
const responseModel = require('./utilities/response_model');

//Route files
const notification = require("./routes/notification");

const app = express();

// Body parser
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount routers
app.use("/api/v1/notification", notification);

//Handled any Internal server Err
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json(
      responseModel.show(false, null, error.message || 'Please try again')
    )
})

//Defining PORT Configuration
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
})
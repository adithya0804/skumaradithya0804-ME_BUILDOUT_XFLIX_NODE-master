const express=require("express");
const mongoose=require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const ApiError=require("./utils/ApiError");
const routes=require("./routes/index.routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const httpStatus = require("http-status");
const app=express();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
mongoose
  .connect(config.mongoose.url)
  .then(() => console.log("Connected to DB at", config.mongoose.url))
  .catch((e) => console.log("Failed to connect to DB", e));

  app.use("/v1", routes);
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);

// handle error
app.use(errorHandler);
  app.listen(config.port,()=>{
    console.log("Express Server runniing at port 8082");
  
});

const express = require("express");
const connection = require("./database");
const userRouter = require("./routes/user");
const app = express();
var cors = require("cors");
app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log(`Rest API listening at port ${port}`);
});

app.use(express.json());
app.use("/user", userRouter);
module.exports = app;
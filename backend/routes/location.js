const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/get", (req, res, next) => {
  var query = "select * from location";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});


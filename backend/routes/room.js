const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/get/:hotel_id", (req, res, next) => {
    const hotel_id = req.params.hotel_id;
    const query =
      `select * from rooms where hotel_id=?`;
    connection.query(query, [hotel_id], (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const hotels = results;
  
          res.status(200).json(hotels);
        } else {
          res.status(404).json({ message: "Hotels not found" });
        }
      } else {
        res.status(500).json(err);
      }
    });
  });

  module.exports = router;
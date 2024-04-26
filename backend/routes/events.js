const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/:hotel_id", (req, res, next) => {
    const hotel_id=req.params.hotel_id;
  const query =
    `select * from events where hotel_id=?`;
  connection.query(query,[hotel_id],(err, results) => {
    if (!err) {
      if (results.length > 0) {
        const event = results;

        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Events are not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});


module.exports = router;
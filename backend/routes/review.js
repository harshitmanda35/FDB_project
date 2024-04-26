const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/:hotel_id", (req, res, next) => {
    const hotel_id=req.params.hotel_id;
  const query =
    `select * from review join user on user.user_id=review.user_id where hotel_id=?`;
  connection.query(query,[hotel_id],(err, results) => {
    if (!err) {
      if (results.length > 0) {
        const review = results;

        res.status(200).json(review);
      } else {
        res.status(404).json({ message: "Reviews are not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});


module.exports = router;
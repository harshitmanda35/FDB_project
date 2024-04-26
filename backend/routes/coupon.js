const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/:user_id", (req, res, next) => {
    const user_id = req.params.user_id;
    const query =
      `SELECT * from coupons join user_coupon on coupons.coupon_id=user_coupon.coupon_id
      WHERE user_id =?;
      `;
    connection.query(query, [user_id], (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const coupons = results;
  
          res.status(200).json(coupons);
        } else {
          res.status(404).json({ message: "Coupons not found" });
        }
      } else {
        res.status(500).json(err);
      }
    });
  });
  router.get("/get/:coupon_id", (req, res, next) => {
    const coupon_id = req.params.coupon_id;
    const query =
      `SELECT * from coupons
      WHERE coupon_id =?;
      `;
    connection.query(query, [coupon_id], (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const coupons = results;
  
          res.status(200).json(coupons);
        } else {
          res.status(404).json({ message: "Coupons not found" });
        }
      } else {
        res.status(500).json(err);
      }
    });
  });



  module.exports = router;
const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/get/:location_id", (req, res, next) => {
    const location_id = req.params.location_id;
    const query =
      `select * from hotel where location_id=?`;
    connection.query(query, [location_id], (err, results) => {
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

  router.get("/:hotel_id", (req, res, next) => {
    const hotel_id = req.params.hotel_id;
    const query =
      `select * from hotel where hotel_id=?`;
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

  router.delete('/:hotel_id', (req, res, next) => {
    hotel_id = req.params.hotel_id;
    console.log("dept id", hotel_id)
    var update = 'delete from hotel where hotel_id=?'
    connection.query(update, [hotel_id], (err, results) => {
      console.log("results", results)
      if (!err) {
        return res.status(200).json(results);
      }
      else {
        return res.status(500).json(err)
      }
    })
  })

  router.post('/:hotel_id', (req, res, next) => {
    const hotel = req.body;
    console.log("hotel req body", hotel)
    var update = 'update hotel set hotel_name=?, description=?, contact_info=?, photos=?, opening_hours=?, location_id=?, total_rooms=?, price_per_room=? where hotel_id=?'
    connection.query(update, [hotel.hotel_name, hotel.description, hotel.contact_info, hotel.photos, hotel.opening_hours, hotel.location_id, hotel.total_rooms, hotel.location_id, hotel.hotel_id], (err, results) => {
      console.log("results", results)
      if (!err) {
        return res.status(200).json(results);
      }
      else {
        return res.status(500).json(err)
      }
    })
  })
  
  router.post('/', (req, res, next) => {
    const hotel = req.body;
    console.log("dept req body", hotel)
    var insert = 'Insert into hotel (hotel_name, description, contact_info, photos, opening_hours, location_id, total_rooms, price_per_room) values(?,?,?,?,?,?,?,?)'
    connection.query(insert, [hotel.hotel_name, hotel.description, hotel.contact_info, hotel.photos, hotel.opening_hours, hotel.location_id, hotel.total_rooms, hotel.location_id], (err, results) => {
      console.log("results", results)
      if (!err) {
        return res.status(200).json(results);
      }
      else {
        return res.status(500).json(err)
      }
    })
  })

  module.exports = router;
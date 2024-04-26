const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/user/:user_id", (req, res, next) => {
    const user_id=req.params.user_id;
  const query =
    `select * from user_preferences where user_id=?`;
  connection.query(query,[user_id],(err, results) => {
    if (!err) {
      if (results.length > 0) {
        const pref = results;

        res.status(200).json(pref);
      } else {
        res.status(404).json({ message: "Preferences are not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.post('/:preference_id', (req, res, next) => {
  const pref = req.body;
  console.log(pref,"body")
  var update = 'update user_preferences set special_requests=?,room_type_preference=?, floor_level_preference=?, amenities_preference=?,language_preference=? where preference_id=?'
  connection.query(update, [pref.special_requests, pref.room_type_preference, pref.floor_level_preference,pref.amenities_preference,pref.language_preference,pref.preference_id], (err, results) => {
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
  const pref = req.body;
  console.log("Preference req body", staff)
  var insert = 'Insert into user_preferences (special_requests, room_type_preference, floor_level_preference, amenities_preference, language_preference,user_id) values(?,?,?,?,?,?)'
  connection.query(insert, [pref.special_requests, pref.room_type_preference,pref.floor_level_preference, pref.amenities_preference, pref.language_preference,pref.user_id], (err, results) => {
    console.log("results", results)
    if (!err) {
      return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err)
    }
  })
})

router.delete('/:preference_id', (req, res, next) => {
    preference_id = req.params.preference_id;
  console.log("preference_id id", preference_id)
  var update = 'delete from user_preferences where preference_id=?'
  connection.query(update, [preference_id], (err, results) => {
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
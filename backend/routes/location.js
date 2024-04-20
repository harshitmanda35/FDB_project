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

router.delete("/delete-location/:locationId", (req, res) => {
  const locationId = req.params.locationId;
  connection.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error starting transaction");
    }
    const deleteShowTimeQuery = `
        DELETE FROM show_time 
        WHERE theater_id IN (
          SELECT theater_id 
          FROM theater 
          WHERE location_id = ?
        )`;
    connection.query(deleteShowTimeQuery, [locationId], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error(err);
          res.status(500).send("Error deleting show_time entries");
        });
      }
      const deleteTheaterQuery = "DELETE FROM theater WHERE location_id = ?";
      connection.query(deleteTheaterQuery, [locationId], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error(err);
            res.status(500).send("Error deleting theaters");
          });
        }
        const deleteLocationQuery =
          "DELETE FROM location WHERE location_id = ?";
        connection.query(deleteLocationQuery, [locationId], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error(err);
              res.status(500).send("Error deleting location");
            });
          }
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error(err);
                res.status(500).send("Error committing transaction");
              });
            }
            res.send("deleted successfully");
          });
        });
      });
    });
  });
});
router.post("/create", (req, res) => {
  const { zipcode, city, state } = req.body;

  const query = "INSERT INTO location (zipcode, city, state) VALUES (?, ?, ?)";
  connection.query(query, [zipcode, city, state], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error occurred: " + err.message);
    }
    res.status(201).send("Location added successfully");
  });
});
router.post("/update/:locationId", (req, res) => {
  const locationId = req.params.locationId;
  const { city, state, zipcode } = req.body;
  connection.query(
    "UPDATE location SET city = ?, state = ?, zipcode = ? WHERE location_id = ?",
    [city, state, zipcode, locationId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ message: "Location updated successfully." });
    }
  );
});

router.get("/getLoc/:locationId", (req, res, next) => {
  const locationId = req.params.locationId;

  const query = "SELECT * FROM location WHERE location_id = ?";

  connection.query(query, [locationId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const movieDetails = results[0];
        res.status(200).json(movieDetails);
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
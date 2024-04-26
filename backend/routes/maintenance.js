const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/admin/:admin_id", (req, res, next) => {
    const admin_id=req.params.admin_id;
  const query =
    `select * from maintenance where admin_id=?`;
  connection.query(query,[admin_id], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const maintenances = results;

        res.status(200).json(maintenances);
      } else {
        res.status(404).json({ message: "maintenances not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.post('/:maintenance_id', (req, res, next) => {
  const main = req.body;
  console.log("main req body", main)
  var update = 'update maintenace set description=?, status=?, priority=?, comments=? where maintenance_id=?'
  connection.query(update, [main.description, main.status, main.priority, main.comments], (err, results) => {
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
  const main = req.body;
  console.log("main req body", main)
  var insert = 'Insert into maintenace (description, status, priority, comments,admin_id) values(?,?,?,?,?)'
  connection.query(insert, [main.description, main.status, main.priority, main.comments, main.admin_id], (err, results) => {
    console.log("results", results)
    if (!err) {
      return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err)
    }
  })
})

router.delete('/:maintenance_id', (req, res, next) => {
    maintenance_id = req.params.maintenance_id;
  console.log("maintenance id", maintenance_id)
  var update = 'delete from maintenance_staff where maintenance_id=?'
  connection.query(update, [maintenance_id], (err, results) => {
    console.log("results", results)
    if (!err) {
        var update2='delete from maintenance where maintenance_id=?'
        connection.query(update2, [maintenance_id], (err, results) => {
            console.log("results", results)
            if (!err) {
              return res.status(200).json(results);
            }
            else {
              return res.status(500).json(err)
            }
          })
    //   return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err)
    }
  })
})

module.exports = router;
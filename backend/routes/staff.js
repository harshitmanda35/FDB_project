const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/admin/:admin_id", (req, res, next) => {
    const admin_id=req.params.admin_id;
  const query =
    `select * from staff where admin_id=?`;
  connection.query(query,[admin_id],(err, results) => {
    if (!err) {
      if (results.length > 0) {
        const staff = results;

        res.status(200).json(staff);
      } else {
        res.status(404).json({ message: "Staffs are not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.post('/:staff_id', (req, res, next) => {
  const staff = req.body;
  console.log("staff req body", dept)
  var update = 'update staff set staff_salary=?, position=?, where staff_id=?'
  connection.query(update, [staff.staff_salary, staff.position,staff.staff_id], (err, results) => {
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
  const staff = req.body;
  console.log("staff req body", staff)
  var insert = 'Insert into staff (staff_name, position, staff_salary, gender,admin_id) values(?,?,?,?)'
  connection.query(insert, [staff.staff_name, staff.position, staff.staff_salary, staff.gender,staff.admin_id], (err, results) => {
    console.log("results", results)
    if (!err) {
      return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err)
    }
  })
})

router.delete('/:staff_id', (req, res, next) => {
  staff_id = req.params.staff_id;
  console.log("staff id", staff_id)
  var update = 'delete from maintenance_staff where staff_id=?'
  connection.query(update, [staff_id], (err, results) => {
    console.log("results", results)
    if (!err) {
        var update2 = 'delete from staff where staff_id=?'
        connection.query(update2, [staff_id], (err, results) => {
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
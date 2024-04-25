const express = require("express");
const connection = require("../database");
const router = express.Router();

router.get("/", (req, res, next) => {
  const query =
    `select * from department`;
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const departments = results;

        res.status(200).json(departments);
      } else {
        res.status(404).json({ message: "departments not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.post('/:dept_id', (req, res, next) => {
  const dept = req.body;
  console.log("dept req body", dept)
  var update = 'update department set department_name=?, description=?, contact_info=?, admin_id=? where department_id=?'
  connection.query(update, [dept.department_name, dept.description, dept.contact_info, dept.admin_id, dept.department_id], (err, results) => {
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
  const dept = req.body;
  console.log("dept req body", dept)
  var insert = 'Insert into department (department_name, description, contact_info, admin_id) values(?,?,?,?)'
  connection.query(insert, [dept.department_name, dept.description, dept.contact_info, dept.admin_id], (err, results) => {
    console.log("results", results)
    if (!err) {
      return res.status(200).json(results);
    }
    else {
      return res.status(500).json(err)
    }
  })
})

router.delete('/:dept_id', (req, res, next) => {
  dept_id = req.params.dept_id;
  console.log("dept id", dept_id)
  var update = 'delete from department where department_id=?'
  connection.query(update, [dept_id], (err, results) => {
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
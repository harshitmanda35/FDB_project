const express = require("express");
const connection = require("../database");
const router = express.Router();

router.post('/reserve', (req, res, next) => {
    const booking = req.body;
    console.log(booking)
    var check_in_date = new Date()
    var query = "insert into booking(check_in_date,total_cost, hotel_id,user_id) values(?,?,?,?)"
    var update = 'update hotel set total_rooms=? where hotel_id=?'
    connection.query(query, [check_in_date, booking.total_cost, booking.hotel_id, booking.user_id], (err, results) => {
        console.log(results)
        if (!err) {
            connection.query(update, [booking.total_rooms, booking.hotel_id], (err, results) => {
                if (err) {
                    return res.status(500).json(err.sqlMessage)
                }
            })
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err.sqlMessage)

        }
    })
})


router.get("/get/:booking_id", (req, res, next) => {
    const booking_id = req.params.booking_id;

    const query = "SELECT * FROM booking join hotel on hotel.hotel_id=booking.hotel_id join user on user.user_id=booking.user_id WHERE booking_id = ?";

    connection.query(query, [booking_id], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                const booking = results[0];
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        } else {
            res.status(500).json(err);
        }
    });
});


router.get("/user/:user_id", (req, res, next) => {
    const user_id = req.params.user_id;

    const query = "SELECT * FROM booking join hotel on hotel.hotel_id=booking.hotel_id WHERE user_id = ?";

    connection.query(query, [user_id], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                const booking = results;
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        } else {
            res.status(500).json(err);
        }
    });
});

module.exports = router;
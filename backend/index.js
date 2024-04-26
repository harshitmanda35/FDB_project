const express = require("express");
const connection = require("./database");
const userRouter = require("./routes/user");
const locationRouter=require('./routes/location')
const hotelRouter=require('./routes/hotel')
const amenitiesRouter=require('./routes/amenities')
const roomsRouter=require('./routes/room')
const bookingRouter=require('./routes/booking')
const departmentRouter=require('./routes/department')
const staffRouter=require('./routes/staff')
const maintenaceRouter=require('./routes/maintenance')
const preferenceRouter=require('./routes/preferences')
const eventRouter=require('./routes/events')
const reviewRouter=require('./routes/review')
const couponRouter=require('./routes/coupon')
const app = express();
var cors = require("cors");
app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log(`Rest API listening at port ${port}`);
});

app.use(express.json());
app.use("/user", userRouter);
app.use('/location',locationRouter)
app.use('/hotel',hotelRouter)
app.use('/amenities',amenitiesRouter)
app.use('/rooms',roomsRouter)
app.use('/booking',bookingRouter)
app.use('/department', departmentRouter)
app.use('/staff', staffRouter)
app.use('/maintenace',maintenaceRouter)
app.use('/pref',preferenceRouter)
app.use('/event',eventRouter)
app.use('/review',reviewRouter)
app.use('/coupon',couponRouter)
module.exports = app;
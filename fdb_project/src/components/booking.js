import React, { useState, useEffect } from 'react';
import axios from 'axios'; // assuming you use axios for API calls
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom to get URL parameters
import '../styling/booking.css'; // Import CSS file for styling

function BookingConfirmationPage() {
  const { booking_id , rooms_booked} = useParams(); // Get the booking ID from the URL parameters
  const [booking, setBooking] = useState(null);
  const url = 'http://localhost:3000'

  useEffect(() => {
    // Fetch booking details based on the booking ID
    axios.get(`${url}/booking/get/${booking_id}`)
      .then(response => {
        console.log(response)
        setBooking(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [booking_id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-confirmation-container">
      <h1>Booking Confirmation</h1>
      <div>
        <h2>Booking Details</h2>
        <p><strong>Booking ID:</strong> {booking.booking_id}</p>
        <p><strong>Booked Date: </strong>{booking.check_in_date}</p>
        <p><strong>Total Cost:</strong> ${booking.total_cost}</p>
        <p><strong>Hotel Name:</strong> {booking.hotel_name}</p>
        <p><strong>Booked Rooms: </strong>{rooms_booked}</p>
        <p><strong>User: </strong>{booking.name}</p>
      </div>
      {/* You can add more details here as needed */}
    </div>
  );
}

export default BookingConfirmationPage;

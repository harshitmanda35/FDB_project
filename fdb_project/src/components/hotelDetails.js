import React, { useState, useEffect } from 'react';
import axios from 'axios'; // assuming you use axios for API calls
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom to get URL parameters
import { Link, useNavigate } from "react-router-dom";
import "../styling/hotel_details.css";

function HotelDetailsPage() {
  const { hotelId } = useParams(); // Get the hotel ID from the URL parameters
  const [hotel, setHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [rooms_booked, setRoomsbooked] = useState(null);
  const [num_nights, setNumnights] = useState(null);
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);
  const url = 'http://localhost:3000'
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotel details based on the hotel ID
    axios.get(`${url}/hotel/${hotelId}`)
      .then(response => {
        console.log(response, "hotels")
        setHotel(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotel details:', error);
      });

    // Fetch hotel amenities based on the hotel ID
    axios.get(`${url}/amenities/get/${hotelId}`)
      .then(response => {
        setAmenities(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotel amenities:', error);
      });

    // Fetch hotel rooms based on the hotel ID
    axios.get(`${url}/rooms/get/${hotelId}`)
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotel amenities:', error);
      });
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }
  // Calculate total cost of selected amenities and rooms
  const selectedAmenitiesCost = selectedAmenities.reduce((acc, amenityId) => {
    const amenity = amenities.find(a => a.amenity_id === amenityId);
    return acc + (amenity ? amenity.cost : 0);
  }, 0);

  const totalCost = (rooms_booked > 0 ? hotel[0].price_per_room : 0) * rooms_booked * num_nights + selectedAmenitiesCost;
  console.log(totalCost, "totalcost")

  const handleAmenityChange = (event) => {
    const amenityId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };
  const handleRoomBooked = (event) => {
    setRoomsbooked(event.target.value)
  }
  const numNights = (event) => {
    setNumnights(event.target.value)
  }

  const handleBooking = () => {
    if (!rooms_booked) {
      alert("Enter the Number of rooms you want to book")
    }
    else {

      alert(`your total cost of the booking would be ${totalCost}`)
      // Prepare data for booking request
      const today = new Date()
      const bookingData = {
        hotel_id: hotel[0].hotel_id,
        total_rooms: hotel[0].total_rooms - rooms_booked,
        check_in_date: today,
        check_out_date: new Date(today + num_nights),
        total_cost: totalCost,
        num_nights: num_nights,
        user_id: localStorage.getItem("user_id")
      };
      console.log(bookingData,"bookingdata")

      // Make booking request to backend API
      axios.post(`${url}/booking/reserve`, bookingData)
        .then(response => {
          console.log(response)
          const booking_id=response.data.insertId
          alert("your booking is successful")
          navigate(`/booking/${booking_id}/${rooms_booked}`)
        })
        .catch(error => {
          console.error('Error booking hotel:', error);
        });
    }
  };
  const handleRoomChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => parseInt(option.value));
    console.log(selectedOptions)
    setRoomsbooked(selectedOptions.length)
    setSelectedRoomNumbers(selectedOptions);
  };

  return (
    <>


      <div className="hotel-details-container">
        <h1>{hotel.hotel_name}</h1>
        <div className="amenities-container">
          <h2>Amenities</h2>
          <div className="amenities-cards">
            {amenities.map(amenity => (
              <div key={amenity.amenity_id} className="amenity-card">
                <h3>{amenity.amenity_name}</h3>
                <p>{amenity.description}</p>
                {/* Display amenity photo */}
                <img src={amenity.photo} alt={amenity.amenity_name} />
                <p>Accessibility: {amenity.accessibility}</p>
                <p>Rules: {amenity.rules}</p>
                <p>Cost: ${amenity.cost}</p>
                <p>Contact Info: {amenity.contact_info}</p>
              </div>
            ))}
          </div>
        </div>
        <p><strong>Rooms Available in the {hotel[0].hotel_name} are: </strong>{hotel[0].total_rooms}</p>
        <p><strong>Cost of each room is: </strong>{hotel[0].price_per_room}</p>
        <div className="amenities-cards">
          {amenities.map(amenity => (
            <div key={amenity.amenity_id} className="amenity-card">
              <label>
                <input
                  type="checkbox"
                  value={amenity.amenity_id}
                  checked={selectedAmenities.includes(amenity.amenity_id)}
                  onChange={handleAmenityChange}
                />
                {amenity.amenity_name} (+ ${amenity.cost})
              </label>
            </div>
          ))}
          {/* <div className="rooms-container">
 <select multiple onChange={handleRoomChange}>
          {rooms.map(room => (
            <option key={room.room_id} value={room.room_id}>
             No. {room.room_number}
            </option>
            
          ))}
        </select>
        </div> */}
          <input type="number" className="amenity-card"
            placeholder='No. of Rooms' value={rooms_booked} onChange={handleRoomBooked}
          ></input>
          <input type="number" className="amenity-card"
            placeholder='No. of Nights' value={num_nights} onChange={numNights}
          ></input>
        </div>
        <br></br>

        <br></br>
        <br></br>
        <button className="book-now-button" onClick={handleBooking}>Book Now</button>

      </div>

    </>
  );
}

export default HotelDetailsPage;

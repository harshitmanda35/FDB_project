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
  const url='http://localhost:3000'
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotel details based on the hotel ID
    axios.get(`${url}/hotel/${hotelId}`)
      .then(response => {
        console.log(response,"hotels")
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
        console.error('Error fetching hotel rooms:', error);
      });
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
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
  </div>
  );
}

export default HotelDetailsPage;

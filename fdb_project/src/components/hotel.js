import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // assuming you use axios for API calls
import "../styling/hotel.css";

function HotelPage() {
  const [locations, setLocations] = useState([]);
  const [location_id, setLocationId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const url='http://localhost:3000'
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch locations from the server when the component mounts
    axios.get(`${url}/location/get`)
      .then(response => {
        console.log(response)
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch hotels based on the selected location
    if (location_id) {
        console.log(locations.find(loc => loc.location_id==location_id)?.place,"hrekll")
      axios.get(`${url}/hotel/get/${location_id}`)
        .then(response => {
            console.log(response)
          setHotels(response.data);
        })
        .catch(error => {
          console.error('Error fetching hotels:', error);
        });
    }
  }, [location_id]);

  const handleLocationChange = (event) => {
    setLocationId(event.target.value);
    setSelectedHotel(null);
  };
  const handleHotelClick = (hotelId) => {
    navigate(`/user/hotel_details/${hotelId}`);
    // setSelectedHotel(selectedHotel == hotelId ? null : hotelId); // Toggle detailed view
  };


  return (
    <div>
      <h1>Hotels</h1>
      <div>
        <label htmlFor="location">Select Location: </label>
        <select id="location" value={location_id} onChange={handleLocationChange}>
          <option value="">Select a location</option>
          {locations.map(location => (
            <option key={location.location_id} value={location.location_id}>
              {location.place}, {location.city}, {location.country}
            </option>
          ))}
        </select>
      </div>
      {location_id && (
        <div>
          <h2>Hotels in {}{locations.find(loc => loc.location_id == location_id)?.place}</h2>
          <div className="hotel-cards">
            {hotels.map(hotel => (
              <div key={hotel.hotel_id} className="hotel-card" onClick={() => handleHotelClick(hotel.hotel_id)}>
                <h3>{hotel.hotel_name}</h3>
                <p>{hotel.description}</p>
                <div className="hotel-photos">
                  {hotel.photos.split(',').map((photo, index) => (
                    <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                  ))}
                </div>
                <p><strong>Contact Info:</strong> {hotel.contact_info}</p>
                    <p><strong>Opening Hours:</strong> {hotel.opening_hours}</p>
                {/* Display other hotel details */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelPage;

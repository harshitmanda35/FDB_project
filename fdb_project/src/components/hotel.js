import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // assuming you use axios for API calls
import "../styling/hotel.css";
import DeleteModal from '../Modals/deleteModal';
import ReactModal from 'react-modal';

let hotel = {
  hotel_id: "",
  hotel_name: "",
  description: "",
  photos: "",
  contact_info: "",
  opening_hours: "",
  location_id: 0,
  total_rooms: 0,
  price_per_room: 0,
}

function HotelPage() {
  const [locations, setLocations] = useState([]);
  const [location_id, setLocationId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(hotel);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const url = 'http://localhost:3000'
  const navigate = useNavigate();

  let isAdmin = localStorage.getItem("isAdmin");
  isAdmin=isAdmin==="true"?true:false;

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
      console.log(locations.find(loc => loc.location_id == location_id)?.place, "hrekll")
      fetchHotels();
    }
  }, [location_id]);

  function fetchHotels() {
    axios.get(`${url}/hotel/get/${location_id}`)
      .then(response => {
        console.log(response)
        setHotels(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }

  const handleLocationChange = (event) => {
    setShowLocations(false);
    setLocationId(event.target.value);
    setSelectedHotel(null);
  };

  const handleHotelClick = (hotelId) => {
    if (!isAdmin) {
      navigate(`/user/hotel_details/${hotelId}`);
    }
    // setSelectedHotel(selectedHotel == hotelId ? null : hotelId); // Toggle detailed view
  };

  const handldeDeleteHotel = (e) => {
    // API call
    e.preventDefault();
    axios.delete(`${url}/hotel/${selectedHotel.hotel_id}`)
      .then(response => {
        console.log(response)
        alert("Hotel deleted successfully!!!");
        fetchHotels();
      })
      .catch(error => {
        console.error('Error deleting Hotel:', error);
        alert("Hotel deletion failed", error); // error is not shown to user.. its fine
      })
      .finally(() => {
        setShowDeleteModal(false);
        setSelectedHotel(hotel);
      });
  }

  const updateOrCreateHotel = (e) => {
    e.preventDefault();

    if (selectedHotel.hotel_id == "") {
      selectedHotel.location_id = location_id;
      axios.post(`${url}/hotel/`, selectedHotel)
        .then(response => {
          console.log(response)
          alert("Hotel created successfully!!!");
          fetchHotels();
        })
        .catch(error => {
          console.error('Error creating Hotel:', error);
          alert("Hotel creation failed", error);
        })
        .finally(() => {
          setShowModal(false);
          setSelectedHotel(hotel);
        });
    } else {
      axios.post(`${url}/hotel/${selectedHotel.hotel_id}`, selectedHotel)
        .then(response => {
          console.log(response)
          alert("Hotel updated successfully!!!");
          fetchHotels();
        })
        .catch(error => {
          console.error('Error updating Hotel:', error);
          alert("Hotel updated failed", error);
        })
        .finally(() => {
          setShowModal(false);
          setSelectedHotel(hotel);
        });
    }
  }

  return (
    <div>
      <div className='relative m-auto'>
        <h1 className='text-2xl my-4 font-bold'>Hotels</h1>
       {isAdmin&& <button onClick={() => setShowModal(true)} className='absolute top-0 right-5 btn bg-lime-700 font-bold border rounded px-2.5 py-2 ml-auto text-white'>create new</button>}
      </div>

      <button onClick={() => {
        setShowLocations((showLocation) => !showLocation);
      }} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" type="button"> {location_id ? 'Change Location' : 'Select Location'} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {
        showLocations && <div id="dropdownDivider" className="z-10 mx-auto mt-2 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
            {locations.map(location => (
              <li className='w-full' key={location.location_id}>
                <button onClick={handleLocationChange} value={location.location_id} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{location.place}, {location.city}, {location.country}</button>
              </li>
            ))}
          </ul>
          {isAdmin && <div className="py-2">
            <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add new location</button>
          </div>}
        </div>
      }

      {location_id && (
        <div className='mt-4'>
          <h2 className='text-xl'>Hotels in <span className='font-bold'>{locations.find(loc => loc.location_id == location_id)?.place}</span></h2>
          <div className="flex flex-wrap cursor-pointer justify-center">
            {hotels.map(hotel => (
              <div key={hotel.hotel_id} onClick={() => handleHotelClick(hotel.hotel_id)} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-1/2 mt-2 mr-2">
                <div className="max-w-5/12 bg-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" style={{ backgroundImage: `url(${hotel.photos})`, maxWidth: '33.33%', width: '100%', height: '100%' }}>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.hotel_name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{hotel.description}</p>
                  <br></br>
                  <div className='grid grid-flow-col grid-rows-2 gap-2 text-white'>
                    {isAdmin && <>
                      <p><strong>Rooms Available</strong></p>
                      <p>{hotel.total_rooms}</p>
                      <p><strong>Cost per room</strong></p>
                      <p>{hotel.price_per_room} USD</p>
                    </>}
                  </div>
                  <br></br>
                  <p className='text-white'><strong>Contact Info:</strong>{hotel.contact_info}</p>
                  <p className='text-white'><strong>Opening Hours:</strong>{hotel.opening_hours}</p>
                  {isAdmin && <div className="flex mt-3 md:mt-6 m-auto">
                    <button onClick={() => {
                      setShowModal(true);
                      setSelectedHotel(hotel);
                    }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => {
                      setShowDeleteModal(true);
                      setSelectedHotel(hotel);
                    }} className="py-2 px-4 ms-2 text-sm font-medium bg-red-600 rounded-lg border border-red-700 hover:bg-red-800 text-white"><i className="fa-solid fa-trash"></i></button>
                  </div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ReactModal
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => {
          setShowModal(false);
          setSelectedHotel(hotel);
        }}
        className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
      >
        <form className="login-form border border-gray-300 rounded-lg m-auto bg-white px-6 py-3" onSubmit={updateOrCreateHotel}>
          <h1 className='text-xl font-bold text-center mb-4'>Update Hotel Details</h1>
          <label htmlFor="hotelName" className="form-label">
            Hotel Name
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                hotel_name: e.target.value
              }
            })}
            placeholder="Enter Hotel Name"
            id="hotelName"
            name="hotelName"
            value={selectedHotel?.hotel_name}
          />

          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                description: e.target.value
              }
            })}
            placeholder="Enter Hotel description"
            id="desc"
            name="desc"
            value={selectedHotel?.description}
          />

          <label htmlFor="photos" className="form-label">
            Hotel Photo Link
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                photos: e.target.value
              }
            })}
            placeholder="Enter Hotel Photo link"
            id="photos"
            name="photos"
            value={selectedHotel?.photos}
          />

          <label htmlFor="contactInfo" className="form-label">
            Contact Info
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                contact_info: e.target.value
              }
            })}
            placeholder="Enter mobile number"
            id="contactInfo"
            name="contactInfo"
            value={selectedHotel?.contact_info}
          />

          <label htmlFor="openingHours" className="form-label">
            Opening Hours
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                opening_hours: e.target.value
              }
            })}
            placeholder="Enter Opening Hours"
            id="openingHours"
            name="openingHours"
            value={selectedHotel?.opening_hours}
          />

          <label htmlFor="numOfRooms" className="form-label">
            Number of Rooms
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                total_rooms: e.target.value
              }
            })}
            placeholder="Enter Number Of Rooms"
            id="numOfRooms"
            name="numOfRooms"
            value={selectedHotel?.total_rooms}
          />

          <label htmlFor="costPerRoom" className="form-label">
            Cost per room
          </label>
          <input
            type="text"
            className="form-control mb-2"
            onChange={(e) => setSelectedHotel((hotel) => {
              return {
                ...hotel,
                price_per_room: e.target.value
              }
            })}
            placeholder="Enter Cost per room"
            id="costPerRoom"
            name="costPerRoom"
            value={selectedHotel?.price_per_room}
          />

          <div className="mt-4 pb-3">
            <button type="submit" className={`btn ${selectedHotel?.hotel_id == "" ? 'bg-green-600' : 'bg-orange-400'} py-2 px-4 text-white rounded w-full`}>
              {selectedHotel?.hotel_id == "" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </ReactModal>

      <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setSelectedEntity={setSelectedHotel} handldeDeleteEntity={handldeDeleteHotel} entity={hotel} />
    </div>
  );
}

export default HotelPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // assuming you use axios for API calls
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom to get URL parameters
import "../styling/hotel.css";

function MyBookings() {
  const [mybookings, setMyBooking] = useState(null);
  const url = 'http://localhost:3000'
  const user_id= parseInt(localStorage.getItem("user_id"))

  useEffect(() => {
    // Fetch booking details based on the booking ID
    axios.get(`${url}/booking/user/${user_id}`)
      .then(response => {
        console.log(response)
        setMyBooking(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [user_id]);

  if (!mybookings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {mybookings?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{mybookings.map(mybook => (
							<div key={mybook.booking_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{mybook.hotel_name}</h5>
                                    <p className="mt-3 text-md text-gray-900 dark:text-white">Cost: {mybook.total_cost}</p>
									<span className="text-sm text-gray-500 dark:text-gray-400">{mybook.check_in_date}</span>
									
								</div>
							</div>

						))}
					</div>
				</div>
			)}

    </div>
  );
}

export default MyBookings;

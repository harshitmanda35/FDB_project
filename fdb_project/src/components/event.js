import React, { useState, useEffect } from 'react';
import axios from 'axios'; // assuming you use axios for API calls
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom to get URL parameters
import "../styling/hotel.css";

function Events() {
  const { hotel_id } = useParams(); // Get the booking ID from the URL parameters
  const [events, setEvents] = useState(null);
  const url = 'http://localhost:3000'

  useEffect(() => {
    // Fetch booking details based on the booking ID
    axios.get(`${url}/event/${hotel_id}`)
      .then(response => {
        console.log(response)
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [hotel_id]);

  if (!events) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {events?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{events.map(event => (
							<div key={event.event_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{event.event_name}</h5>
                                    <p className="mt-3 text-md text-gray-900 dark:text-white">Description: {event.description}</p>
									<span className="text-sm text-gray-500 dark:text-gray-400">{event.additional_notes}</span>
									
								</div>
							</div>

						))}
					</div>
				</div>
			)}

    </div>
  );
}

export default Events;

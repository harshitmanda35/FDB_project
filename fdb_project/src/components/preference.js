import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // assuming you use axios for API calls
import "../styling/hotel.css";
import DeleteModal from '../Modals/deleteModal';
import ReactModal from 'react-modal';

let pref = {
    preference_id: "",
    special_requests: "",
    special_requests: "",
    floor_level_preference: "",
    amenities_preference: 0,
    language_preference: "",
  user_id: parseInt(localStorage.getItem("user_id"))
}

function UserPrefPage() {
    const [Preferences, setPref] = useState([]);
	const [selectedPref, setSelectedPref] = useState(pref);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user_id= parseInt(localStorage.getItem("user_id"))
  const url = 'http://localhost:3000'
  const navigate = useNavigate();


  useEffect(() => {
    fetchPref();
    // Fetch locations from the server when the component mounts
   
  }, []);
  const fetchPref = (e) => {
    // API call
    axios.get(`${url}/pref/user/${user_id}`)
    .then(response => {
        setPref(response.data);
    })
    .catch(error => {
        console.error('Error fetching Preferences:', error);
    });
  }


  const handldeDeletePref = (e) => {
    // API call
    e.preventDefault();
    axios.delete(`${url}/pref/${selectedPref.preference_id}`)
      .then(response => {
        console.log(response)
        alert("Preference deleted successfully!!!");
        fetchPref();
      })
      .catch(error => {
        console.error('Error deleting Preference:', error);
        alert("Preference deletion failed", error); // error is not shown to user.. its fine
      })
      .finally(() => {
        setShowDeleteModal(false);
        setSelectedPref(pref);
      });
  }

  const updateOrCreatePref = (e) => {
    e.preventDefault();

    if (selectedPref.preference_id == "") {
        axios.post(`${url}/pref/`, selectedPref)
            .then(response => {
                console.log(response)
                alert("Preference created successfully!!!");
                fetchPref();
            })
            .catch(error => {
                console.error('Error creating Preference:', error);
                alert("Preference creation failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedPref(pref);
            });
    } else {
        axios.post(`${url}/pref/${selectedPref.preference_id}`, selectedPref)
            .then(response => {
                console.log(response)
                alert("Preference updated successfully!!!");
                fetchPref();
            })
            .catch(error => {
                console.error('Error updating staff:', error);
                alert("Staff updated failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedPref(pref);
            });
    }
  }
  return (
<div>
			<div className='relative px-8 m-auto'>
				<h1 className='text-2xl my-4 font-bold'>Preferences</h1>
				<button onClick={() => setShowModal(true)} className='absolute top-0 right-5 btn bg-lime-700 font-bold border rounded px-2.5 py-2 ml-auto text-white'>create new</button>
			</div>
			{Preferences?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{Preferences.map(prefere => (
							<div key={prefere.preference_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{prefere.special_requests}</h5>
									<span className="text-sm text-gray-500 dark:text-gray-400">{prefere.room_type_preference}</span>
									<p className="mt-3 text-md text-gray-900 dark:text-white">Floor Level Preference: {prefere.floor_level_preference}</p>
                                    <p className="mt-3 text-md text-gray-900 dark:text-white">Amenities Preference: {prefere.amenities_preference}</p>
                                    <p className="mt-3 text-md text-gray-900 dark:text-white">Language Preference: {prefere.language_preference}</p>
									<div className="flex mt-3 md:mt-6">
										<button onClick={() => {
											setShowModal(true);
											setSelectedPref(prefere);
										}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
										<button onClick={() => {
											setShowDeleteModal(true);
											setSelectedPref(prefere);
										}} className="py-2 px-4 ms-2 text-sm font-medium bg-red-600 rounded-lg border border-red-700 hover:bg-red-800 text-white"><i className="fa-solid fa-trash"></i></button>
									</div>
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
					setSelectedPref(pref);
				}}
				className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
			>
				<form className="login-form border border-gray-300 rounded-lg m-auto bg-white px-6 py-3" onSubmit={updateOrCreatePref}>
					<h1 className='text-xl font-bold text-center mb-4'>Update Your Preferences</h1>
					<label htmlFor="staffName" className="form-label">
                    Special Requests
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedPref((pref) => {
							return {
								...pref,
								special_requests: e.target.value
							}
						})}
						placeholder="Enter your special requests"
						id="special_requests"
						name="special_requests"
						value={selectedPref.special_requests}
					/>
		<label htmlFor="desc" className="form-label">
                    Room Type preference
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedPref((pref) => {
							return {
								...pref,
								room_type_preference: e.target.value
							}
						})}
						placeholder="Enter your Room Type preference"
						id="desc"
						name="desc"
						value={selectedPref.room_type_preference}
					/>
					<label htmlFor="desc" className="form-label">
                    Floor level preference
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedPref((pref) => {
							return {
								...pref,
								floor_level_preference: e.target.value
							}
						})}
						placeholder="Enter your Floor level preference"
						id="desc"
						name="desc"
						value={selectedPref.floor_level_preference}
					/>

					<label htmlFor="staff_salary" className="form-label">
                    Amenities preference
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedPref((pref) => {
							return {
								...pref,
								amenities_preference: e.target.value
							}
						})}
						placeholder="Enter your amenities preference"
						id="salaryInfo"
						name="salaryInfo"
						value={selectedPref.amenities_preference}
					/>

<label htmlFor="staff_salary" className="form-label">
Language Preference
					</label>
					<input
						type="int"
						className="form-control mb-2"
						onChange={(e) => setSelectedPref((pref) => {
							return {
								...pref,
								language_preference: e.target.value
							}
						})}
						placeholder="Enter your Language preference"
						id="salaryInfo"
						name="salaryInfo"
						value={selectedPref.language_preference}
					/>

					<div className="mt-4 pb-3">
						<button type="submit" className={`btn ${selectedPref.preference_id == "" ? 'bg-green-600' : 'bg-orange-400'} py-2 px-4 text-white rounded w-full`}>
							{selectedPref.preference_id == "" ? "Create" : "Update"}
						</button>
					</div>
				</form>
			</ReactModal>

            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setSelectedEntity={setSelectedPref} handldeDeleteEntity={handldeDeletePref} entity={pref} />
		</div>  
  );
}

export default  UserPrefPage;

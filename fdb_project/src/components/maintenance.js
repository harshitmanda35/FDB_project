import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // assuming you use axios for API calls
import "../styling/hotel.css";
import DeleteModal from '../Modals/deleteModal';
import ReactModal from 'react-modal';

let main = {
  description: "",
  status: "",
  priority: "",
  comments: "",
  admin_id: parseInt(localStorage.getItem("admin_id"))
}

function MaintenacePage() {
    const [maintenances, setMaintenace] = useState([]);
	const [selectedMaintenace, setSelectedMaintenace] = useState(main);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const admin_id=parseInt(localStorage.getItem("admin_id"));
  const url = 'http://localhost:3000'
  const navigate = useNavigate();

  let isAdmin = localStorage.getItem("isAdmin");
  isAdmin=isAdmin==="true"?true:false;

  useEffect(() => {
    fetchMaintenace();
   
  }, []);
  const fetchMaintenace = (e) => {
    // API call
    axios.get(`${url}/maintenace/admin/${admin_id}`)
    .then(response => {
        setMaintenace(response.data);
    })
    .catch(error => {
        console.error('Error fetching Maintenances:', error);
    });
  }


  const handldeDeleteMaintenace = (e) => {
    // API call
    e.preventDefault();
    axios.delete(`${url}/maintenance/${selectedMaintenace.maintenance_id}`)
      .then(response => {
        console.log(response)
        alert("Maintenance deleted successfully!!!");
        fetchMaintenace();
      })
      .catch(error => {
        console.error('Error deleting Maintenance:', error);
        alert("Maintenance deletion failed", error); // error is not shown to user.. its fine
      })
      .finally(() => {
        setShowDeleteModal(false);
        setSelectedMaintenace(main);
      });
  }

  const updateOrCreateMaintenace = (e) => {
    e.preventDefault();

    if (selectedMaintenace.maintenance_id == "") {
        axios.post(`${url}/maintenance/`, selectedMaintenace)
            .then(response => {
                console.log(response)
                alert("Maintenance created successfully!!!");
                fetchMaintenace();
            })
            .catch(error => {
                console.error('Error creating maintenance:', error);
                alert("maintenance creation failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedMaintenace(main);
            });
    } else {
        axios.post(`${url}/maintenance/${selectedMaintenace.maintenance_id}`, selectedMaintenace)
            .then(response => {
                console.log(response)
                alert("Maintenace updated successfully!!!");
                fetchMaintenace();
            })
            .catch(error => {
                console.error('Error updating maintenance:', error);
                alert("Maintenance updated failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedMaintenace(main);
            });
    }
  }
  return (
<div>
			<div className='relative px-8 m-auto'>
				<h1 className='text-2xl my-4 font-bold'>Maintenace</h1>
				<button onClick={() => setShowModal(true)} className='absolute top-0 right-5 btn bg-lime-700 font-bold border rounded px-2.5 py-2 ml-auto text-white'>create new</button>
			</div>
			{maintenances?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{maintenances.map(maintenance => (
							<div key={maintenance.maintenance_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{maintenance.description}</h5>
									<span className="text-sm text-gray-500 dark:text-gray-400">{maintenance.status}</span>
									<p className="mt-3 text-md text-gray-900 dark:text-white">Priority: {maintenance.priority}</p>
                                    <p className="mt-3 text-md text-gray-900 dark:text-white">Comments: {maintenance.comments}</p>
									<div className="flex mt-3 md:mt-6">
										<button onClick={() => {
											setShowModal(true);
											setSelectedMaintenace(maintenance);
										}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
										<button onClick={() => {
											setShowDeleteModal(true);
											setSelectedMaintenace(maintenance);
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
					setSelectedMaintenace(main);
				}}
				className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
			>
				<form className="login-form border border-gray-300 rounded-lg m-auto bg-white px-6 py-3" onSubmit={updateOrCreateMaintenace}>
					<h1 className='text-xl font-bold text-center mb-4'>Update Maintenace Details</h1>
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedMaintenace((main) => {
							return {
								...main,
								description: e.target.value
							}
						})}
						placeholder="Enter description"
						id="description"
						name="description"
						value={selectedMaintenace.description}
					/>

					<label htmlFor="status" className="form-label">
						Status
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedMaintenace((main) => {
							return {
								...main,
								status: e.target.value
							}
						})}
						placeholder="Enter status of the maintenance"
						id="status"
						name="status"
						value={selectedMaintenace.status}
					/>

					<label htmlFor="priority" className="form-label">
						Priority
					</label>
					<input
						type="int"
						className="form-control mb-2"
						onChange={(e) => setSelectedMaintenace((main) => {
							return {
								...main,
								priority: e.target.value
							}
						})}
						placeholder="Enter Priority"
						id="priority"
						name="priority"
						value={selectedMaintenace.priority}
					/>
<label htmlFor="comments" className="form-label">
						Comments
					</label>
					<input
						type="int"
						className="form-control mb-2"
						onChange={(e) => setSelectedMaintenace((main) => {
							return {
								...main,
								comments: e.target.value
							}
						})}
						placeholder="Enter Comments"
						id="comments"
						name="comments"
						value={selectedMaintenace.comments}
					/>
					<div className="mt-4 pb-3">
						<button type="submit" className={`btn ${selectedMaintenace.maintenance_id == "" ? 'bg-green-600' : 'bg-orange-400'} py-2 px-4 text-white rounded w-full`}>
							{selectedMaintenace.maintenance_id == "" ? "Create" : "Update"}
						</button>
					</div>
				</form>
			</ReactModal>

            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setSelectedEntity={setSelectedMaintenace} handldeDeleteEntity={handldeDeleteMaintenace} entity={main} />
		</div>  
  );
}

export default MaintenacePage;

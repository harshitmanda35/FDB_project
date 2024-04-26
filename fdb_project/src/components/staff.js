import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // assuming you use axios for API calls
import "../styling/hotel.css";
import DeleteModal from '../Modals/deleteModal';
import ReactModal from 'react-modal';

let staff = {
  staff_id: "",
  staff_name: "",
  staff_salary: "",
  position: "",
  staff_salary: 0,
  staff_pic: "",
  gender: "",
  hire_date: "",
  admin_id: parseInt(localStorage.getItem("admin_id"))
}

function StaffsPage() {
    const [staffs, setStaff] = useState([]);
	const [selectedStaff, setSelectedStaff] = useState(staff);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const admin_id= parseInt(localStorage.getItem("admin_id"))
  const url = 'http://localhost:3000'
  const navigate = useNavigate();

  let isAdmin = localStorage.getItem("isAdmin");
  isAdmin=isAdmin==="true"?true:false;

  useEffect(() => {
    fetchStaff();
    // Fetch locations from the server when the component mounts
   
  }, []);
  const fetchStaff = (e) => {
    // API call
    axios.get(`${url}/staff/admin/${admin_id}`)
    .then(response => {
        setStaff(response.data);
    })
    .catch(error => {
        console.error('Error fetching staff:', error);
    });
  }


  const handldeDeleteStaff = (e) => {
    // API call
    e.preventDefault();
    axios.delete(`${url}/staff/${selectedStaff.staff_id}`)
      .then(response => {
        console.log(response)
        alert("Hotel deleted successfully!!!");
        fetchStaff();
      })
      .catch(error => {
        console.error('Error deleting Hotel:', error);
        alert("Hotel deletion failed", error); // error is not shown to user.. its fine
      })
      .finally(() => {
        setShowDeleteModal(false);
        setSelectedStaff(staff);
      });
  }

  const updateOrCreateStaff = (e) => {
    e.preventDefault();

    if (selectedStaff.staff_id == "") {
        axios.post(`${url}/staff/`, selectedStaff)
            .then(response => {
                console.log(response)
                alert("Staff created successfully!!!");
                fetchStaff();
            })
            .catch(error => {
                console.error('Error creating staff:', error);
                alert("Staff creation failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedStaff(staff);
            });
    } else {
        axios.post(`${url}/staff/${selectedStaff.staff_id}`, selectedStaff)
            .then(response => {
                console.log(response)
                alert("Staff updated successfully!!!");
                fetchStaff();
            })
            .catch(error => {
                console.error('Error updating staff:', error);
                alert("Staff updated failed", error);
            })
            .finally(() => {
                setShowModal(false);
                setSelectedStaff(staff);
            });
    }
  }
  return (
<div>
			<div className='relative px-8 m-auto'>
				<h1 className='text-2xl my-4 font-bold'>Staff</h1>
				<button onClick={() => setShowModal(true)} className='absolute top-0 right-5 btn bg-lime-700 font-bold border rounded px-2.5 py-2 ml-auto text-white'>create new</button>
			</div>
			{staffs?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{staffs.map(st => (
							<div key={st.staff_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{st.staff_name}</h5>
									<span className="text-sm text-gray-500 dark:text-gray-400">{st.position}</span>
									<p className="mt-3 text-md text-gray-900 dark:text-white">Salary: {st.staff_salary}</p>
									<div className="flex mt-3 md:mt-6">
										<button onClick={() => {
											setShowModal(true);
											setSelectedStaff(st);
										}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
										<button onClick={() => {
											setShowDeleteModal(true);
											setSelectedStaff(st);
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
					setSelectedStaff(staff);
				}}
				className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
			>
				<form className="login-form border border-gray-300 rounded-lg m-auto bg-white px-6 py-3" onSubmit={updateOrCreateStaff}>
					<h1 className='text-xl font-bold text-center mb-4'>Update Staff Details</h1>
					<label htmlFor="staffName" className="form-label">
						Staff Name
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedStaff((staff) => {
							return {
								...staff,
								staff_name: e.target.value
							}
						})}
						placeholder="Enter Staff Name"
						id="staffName"
						name="staffName"
						value={selectedStaff.staff_name}
					/>

					<label htmlFor="desc" className="form-label">
						Position
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedStaff((staff) => {
							return {
								...staff,
								position: e.target.value
							}
						})}
						placeholder="Enter Staff description"
						id="desc"
						name="desc"
						value={selectedStaff.position}
					/>

					<label htmlFor="staff_salary" className="form-label">
						Salary
					</label>
					<input
						type="int"
						className="form-control mb-2"
						onChange={(e) => setSelectedStaff((staff) => {
							return {
								...staff,
								staff_salary: e.target.value
							}
						})}
						placeholder="Enter staff salary"
						id="salaryInfo"
						name="salaryInfo"
						value={selectedStaff.staff_salary}
					/>

					<div className="mt-4 pb-3">
						<button type="submit" className={`btn ${selectedStaff.staff_id == "" ? 'bg-green-600' : 'bg-orange-400'} py-2 px-4 text-white rounded w-full`}>
							{selectedStaff.staff_id == "" ? "Create" : "Update"}
						</button>
					</div>
				</form>
			</ReactModal>

            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setSelectedEntity={setSelectedStaff} handldeDeleteEntity={handldeDeleteStaff} entity={staff} />
		</div>  
  );
}

export default StaffsPage;

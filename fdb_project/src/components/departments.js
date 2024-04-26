import React, { useState, useEffect } from 'react';
import axios from 'axios'; // assuming you use axios for API calls
import ReactModal from 'react-modal';

let dept = {
	department_id: "",
	department_name: "",
	contact_info: "",
	description: "",
	admin_id: parseInt(localStorage.getItem("admin_id"))
}

const isAdmin = localStorage.getItem("isAdmin");

function Department() {
	const [departments, setDepartments] = useState([]);
	const [selectedDept, setSelectedDept] = useState(dept);
	const [showModal, setShowModal] = useState(false);
	const admin_id= parseInt(localStorage.getItem("admin_id"))
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const url = 'http://localhost:3000';

	// Getting depts from server
	useEffect(() => {
		fetchDepts();
	}, []);

	function fetchDepts() {
		axios.get(`${url}/department/admin/${admin_id}`)
			.then(response => {
				setDepartments(response.data);
			})
			.catch(error => {
				console.error('Error fetching depts:', error);
			});
	}

	const updateOrCreateDept = (e) => {
		e.preventDefault();

		if (selectedDept.department_id == "") {
			axios.post(`${url}/department/`, selectedDept)
				.then(response => {
					console.log(response)
					alert("Department created successfully!!!");
					fetchDepts();
				})
				.catch(error => {
					console.error('Error creating department:', error);
					alert("Department creation failed", error);
				})
				.finally(() => {
					setShowModal(false);
					setSelectedDept(dept);
				});
		} else {
			axios.post(`${url}/department/${selectedDept.department_id}`, selectedDept)
				.then(response => {
					console.log(response)
					alert("Department updated successfully!!!");
					fetchDepts();
				})
				.catch(error => {
					console.error('Error updating department:', error);
					alert("Department updated failed", error);
				})
				.finally(() => {
					setShowModal(false);
					setSelectedDept(dept);
				});
		}
	}

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
		setSelectedDept(dept);
	}

	const handldeDeleteDept = (e) => {
		// API call
		e.preventDefault();
		axios.delete(`${url}/department/${selectedDept.department_id}`)
			.then(response => {
				console.log(response)
				alert("Department deleted successfully!!!");
				fetchDepts();
			})
			.catch(error => {
				console.error('Error deleting department:', error);
				alert("Department deletion failed", error); // error is not shown to user.. its fine
			})
			.finally(() => {
				setShowDeleteModal(false);
				setSelectedDept(dept);
			});
	}

	return (
		<div>
			<div className='relative px-8 m-auto'>
				<h1 className='text-2xl my-4 font-bold'>Departments</h1>
				<button onClick={() => setShowModal(true)} className='absolute top-0 right-5 btn bg-lime-700 font-bold border rounded px-2.5 py-2 ml-auto text-white'>create new</button>
			</div>
			{departments?.length > 0 && (
				<div className='mt-8'>
					 {/*  max-w-7xl  */}
					<div className="m-auto flex flex-wrap justify-center">
						{departments.map(department => (
							<div key={department.department_id} className="w-full px-2 py-4 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow mr-4 mb-4">
								<div className="flex flex-col items-center">
									{/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src=""/> */}
									<h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{department.department_name}</h5>
									<span className="text-sm text-gray-500 dark:text-gray-400">{department.description}</span>
									<p className="mt-3 text-md text-gray-900 dark:text-white">Contact info: {department.contact_info}</p>
									<div className="flex mt-3 md:mt-6">
										<button onClick={() => {
											setShowModal(true);
											setSelectedDept(department);
										}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
										<button onClick={() => {
											setShowDeleteModal(true);
											setSelectedDept(department);
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
					setSelectedDept(dept);
				}}
				className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
			>
				<form className="login-form border border-gray-300 rounded-lg m-auto bg-white px-6 py-3" onSubmit={updateOrCreateDept}>
					<h1 className='text-xl font-bold text-center mb-4'>Update Department Details</h1>
					<label htmlFor="departmentName" className="form-label">
						Department Name
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedDept((dept) => {
							return {
								...dept,
								department_name: e.target.value
							}
						})}
						placeholder="Enter Department Name"
						id="deptName"
						name="departmentName"
						value={selectedDept.department_name}
					/>

					<label htmlFor="desc" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedDept((dept) => {
							return {
								...dept,
								description: e.target.value
							}
						})}
						placeholder="Enter Department description"
						id="desc"
						name="desc"
						value={selectedDept.description}
					/>

					<label htmlFor="contactInfo" className="form-label">
						Contact Info
					</label>
					<input
						type="text"
						className="form-control mb-2"
						onChange={(e) => setSelectedDept((dept) => {
							return {
								...dept,
								contact_info: e.target.value
							}
						})}
						placeholder="Enter mobile number"
						id="contactInfo"
						name="contactInfo"
						value={selectedDept.contact_info}
					/>

					<div className="mt-4 pb-3">
						<button type="submit" className={`btn ${selectedDept.department_id == "" ? 'bg-green-600' : 'bg-orange-400'} py-2 px-4 text-white rounded w-full`}>
							{selectedDept.department_id == "" ? "Create" : "Update"}
						</button>
					</div>
				</form>
			</ReactModal>

			<ReactModal
				isOpen={showDeleteModal}
				ariaHideApp={false}
				onRequestClose={() => {
					setShowDeleteModal(false);
					setSelectedDept(dept);
				}}
				className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
			>
				<div className='border border-gray-300 rounded-lg m-auto bg-white px-6 py-3'>
					<h1 className='text-xl text-center'>Are you sure want to proceed?</h1>
					<div className="flex mt-4 md:mt-6 justify-center">
						<button onClick={handleCancelDelete} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">Cancel</button>
						<button onClick={handldeDeleteDept} className="py-2 px-4 ms-2 text-sm font-medium bg-red-600 rounded-lg border border-red-700 hover:bg-red-800 text-white">Yes, delete</button>
					</div>
				</div>
			</ReactModal>
		</div>
	);
}

export default Department;

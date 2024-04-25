import React from 'react'
import ReactModal from 'react-modal';

const DeleteModal = ({showDeleteModal, setShowDeleteModal, setSelectedEntity, handldeDeleteEntity, entity}) => {

    const handleCancelDelete = () => {
		setShowDeleteModal(false);
		setSelectedEntity(entity);
	}

    return (
        <ReactModal
            isOpen={showDeleteModal}
            ariaHideApp={false}
            onRequestClose={() => {
                setShowDeleteModal(false);
                setSelectedEntity(entity);
            }}
            className="w-1/2 absolute top-1/2 right-1/2 translate-y-[-50%] translate-x-[50%]"
        >
            <div className='border border-gray-300 rounded-lg m-auto bg-white px-6 py-3'>
                <h1 className='text-xl text-center'>Are you sure want to proceed?</h1>
                <div className="flex mt-4 md:mt-6 justify-center">
                    <button onClick={handleCancelDelete} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">Cancel</button>
                    <button onClick={handldeDeleteEntity} className="py-2 px-4 ms-2 text-sm font-medium bg-red-600 rounded-lg border border-red-700 hover:bg-red-800 text-white">Yes, delete</button>
                </div>
            </div>
        </ReactModal>
    )
}

export default DeleteModal

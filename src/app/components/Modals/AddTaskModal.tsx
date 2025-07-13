export const AddTaskModal = ({ handleSubmit, isModalOpen, setIsModalOpen }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, isModalOpen: boolean, setIsModalOpen: (value: boolean) => void }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <>

          {/* The Modal Component */}
          <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closeModal} // Close modal when clicking outside
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm md:max-w-md lg:max-w-lg transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scale-in">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1 transition duration-200 ease-in-out"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>


              <form onSubmit={handleSubmit}>
                <div className="py-6 text-gray-700 space-y-4">
                  <div>
                    <label htmlFor="itemTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      required
                      placeholder="Enter title"
                      name="task"
                      type="text"
                      id="itemTitle"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter description"
                      name="description"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      id="itemDescription"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="hidden">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required={false}
                    />
                  </div>
                </div>


                <div className="flex justify-end pt-4 border-t border-gray-200 space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Define the keyframe animation for the modal */}
          <style jsx>
            {`
                @keyframes scaleIn {
                  from {
                      transform: scale(0.95);
                      opacity: 0;
                  }
                  to {
                      transform: scale(1);
                      opacity: 1;
                  }
                }
                .animate-scale-in {
                  animation: scaleIn 0.3s ease-out forwards;
                }
                /* Inter font import (if not globally available) */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                  .font-inter {
                  font-family: 'Inter', sans-serif;
                  }
              `}
          </style>
        </>
      ) : null}
    </>
  )
}
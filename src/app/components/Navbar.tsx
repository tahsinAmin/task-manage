export const Navbar = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-end items-center">
                <div className="flex space-x-3">
                    <button onClick={() => setIsModalOpen(true)} className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-gray-700 transition-colors duration-200">
                        Create
                    </button>
                    {/* <button className="bg-white text-gray-600 p-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 6.675l-.707-.707M6.675 6.675l-.707-.707m10.65 0l-.707.707M6.675 17.325l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                     </svg>
                   </button> */}
                </div>
            </div>
        </nav>
    )
}
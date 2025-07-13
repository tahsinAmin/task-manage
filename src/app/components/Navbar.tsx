export const Navbar = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-end items-center">
                <div className="flex space-x-3">
                    <button onClick={() => setIsModalOpen(true)} className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-gray-700 transition-colors duration-200">
                        Create
                    </button>
                </div>
            </div>
        </nav>
    )
}
import { taskProp } from "../types";

export const OptionsListMenu = ({activeTag, shiftTask, itemSelected, setIsUpdateModalOpen, setDisplayOptions}: {activeTag: number, shiftTask: (index: number, task: taskProp) => void, itemSelected: taskProp | null, setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setDisplayOptions: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm mx-auto">

        {activeTag !== 0 && <div onClick={() => shiftTask(0, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to New</span>
          </div>
        </div>}
        {activeTag !== 1 && <div onClick={() => shiftTask(1, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to Ongoing</span>
          </div>
        </div>}
        {activeTag !== 2 && <div onClick={() => shiftTask(2, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to Done</span>
          </div>
        </div>}
        <div onClick={() => {setIsUpdateModalOpen(true); setDisplayOptions(false)}} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 text-gray-500 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Task Details</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => setDisplayOptions(false)}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 text-gray-500 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Close Option</span>
          </div>
        </div>

      </div>
    )
}
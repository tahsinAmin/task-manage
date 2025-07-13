import { useModal } from "@/context/ModalContext";
import { OptionsListMenuProps } from "../types";

export const OptionsListMenu = ({ activeTag, shiftTask, itemSelected, setDisplayOptions, deleteTask }: OptionsListMenuProps) => {
  const { setIsUpdateModalOpen } = useModal();
    return (
        <div role="menu" aria-label="Task options" className="menu-list">

        {activeTag !== 0 && <div role="menuitem" tabIndex={0} onClick={() => shiftTask(0, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to New</span>
          </div>
        </div>}
        {activeTag !== 1 && <div role="menuitem" tabIndex={0} onClick={() => shiftTask(1, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to Ongoing</span>
          </div>
        </div>}
        {activeTag !== 2 && <div role="menuitem" tabIndex={0} onClick={() => shiftTask(2, itemSelected!)} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-500 mr-3 rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Move to Done</span>
          </div>
        </div>}
        <div role="menuitem" tabIndex={0} onClick={() => {setIsUpdateModalOpen(true); setDisplayOptions(false)}} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 text-gray-500 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span className="text-gray-800 text-sm font-medium">Task Details</span>
          </div>
        </div>
        <div role="menuitem" tabIndex={0} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => deleteTask(itemSelected!)}>
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-gray-500 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
            <span className="text-gray-800 text-sm font-medium">Delete Task</span>
          </div>
        </div>
        <div role="menuitem" tabIndex={0} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200" onClick={() => setDisplayOptions(false)}>
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
"use client"

import { useState } from "react"
import { taskProp } from "../types/types"
import Column from "./Column"
import { doneDemoTasks, newDemoTasks, ongoingDemoTasks } from "../utils"
import { AddTaskForm } from "./AddTaskForm"
import { Navbar } from "./Navbar"

export const Board = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [newTask, setNewTask] = useState<taskProp[]>(newDemoTasks)
  const [ongoing, setOngoing] = useState<taskProp[]>(ongoingDemoTasks)
  const [done, setDone] = useState<taskProp[]>(doneDemoTasks)
  const [activeTag, setActiveTag] = useState<number>(-1)
  const [displayOptions, setDisplayOptions] = useState<boolean>(false)
  const [itemSelected, setItemSelected] = useState<taskProp | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newItem = { id: crypto.randomUUID(), title: e.currentTarget.task.value, status: "new", description: e.currentTarget.description.value, dueDate: "" };
    setNewTask([newItem, ...newTask])
    e.currentTarget.task.value = ""
    e.currentTarget.description.value = ""
    e.currentTarget.dueDate.value = ""
  }

  const shiftTask = (index: number, task: taskProp) => {
    setDisplayOptions(false)
    if (index === 0) {
      setNewTask([...newTask, { ...task, status: "new" }])
    } else if (index === 1) {
      setOngoing([...ongoing, { ...task, status: "ongoing" }])
    } else {
      setDone([...done, { ...task, status: "done" }])
    }

    if (task.status === "new") {
      setNewTask(newTask.filter((newTask) => newTask.title !== task.title))
    } else if (task.status === "ongoing") {
      setOngoing(ongoing.filter((ongoing) => ongoing.title !== task.title))
    } else {
      setDone(done.filter((done) => done.title !== task.title))
    }
  }

  const moveTask = (task: taskProp, state: number) => {
    setItemSelected(task)
    setActiveTag(state);
    setDisplayOptions(true)
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Optionally reset form fields when closing the modal
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleSubmit2 = () => {
    // Here you would typically handle the submission of the form data
    // For now, let's just log the values
    console.log({
      title,
      description,
      dueDate,
    });
    // Close the modal after submission (or handle further actions)
    closeModal();
  };


  return (
    <div className="">
      <Navbar setIsModalOpen={setIsModalOpen}/>
      
      <div className="w-screen md:max-w-7xl md:mx-auto px-4 pt-10 sm:px-6 xl:pr-0">
        <div className="flex flex-col gap-4">

        {isModalOpen ? ( <AddTaskForm handleSubmit={handleSubmit} />) : null}

          {
            displayOptions &&
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

            </div>
          }
          
          {isModalOpen ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
              {/* Button to open the modal */}
              <button
                onClick={openModal}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Open Input Modal
              </button>

              {/* The Modal Component */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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

                    {/* Modal Body with Input Fields */}
                    <div className="py-6 text-gray-700 space-y-4">
                      <div>
                        <label htmlFor="itemTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          id="itemTitle"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter title"
                        />
                      </div>

                      <div>
                        <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="itemDescription"
                          rows={3}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter description"
                        ></textarea>
                      </div>

                      <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date
                        </label>
                        <input
                          type="date"
                          id="dueDate"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end pt-4 border-t border-gray-200 space-x-3">
                      <button
                        onClick={closeModal}
                        className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit2}
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Define the keyframe animation for the modal */}
              <style jsx>{`
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
      `}</style>
            </div>
          ) : null}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Column title="New" tasks={newTask} state={0} moveTask={moveTask} />
              <Column title="Ongoing" tasks={ongoing} state={1} moveTask={moveTask} />
              <Column title="Done" tasks={done} state={2} moveTask={moveTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client"

import { useState } from "react"
import { taskProp } from "../types/types"
import Column from "./Column"
import { doneDemoTasks, newDemoTasks, ongoingDemoTasks } from "../utils"
import { Navbar } from "./Navbar"
import { Modal } from "./Modal"

export const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false)
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



  return (
    <div className="">
      <Navbar setIsModalOpen={setIsModalOpen}/>
      
      <div className="w-screen md:max-w-7xl md:mx-auto px-4 pt-10 sm:px-6 xl:pr-0">
        <div className="flex flex-col gap-4">

        <Modal handleSubmit={handleSubmit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
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
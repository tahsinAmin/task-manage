"use client"

import { useState } from "react"
import { taskProp } from "../types"
import Column from "./Column"
import { doneDemoTasks, newDemoTasks, ongoingDemoTasks } from "../utils"
import { Navbar } from "./Navbar"
import { AddTaskModal } from "./AddTaskModal"
import { TaskDetailsModal } from "./TaskDetailsModal"

const state = {
    new: 0,
    ongoing: 1,
    done: 2
}


export const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let newOngoing = [...ongoing]

    for (let i = 0; i < newOngoing.length; i++) {
      if (newOngoing[i].id === itemSelected?.id) {
        newOngoing[i].title = e.currentTarget.task.value;
        newOngoing[i].description = e.currentTarget.description.value;
        newOngoing[i].dueDate = e.currentTarget.dueDate.value;
      }
    }

    setOngoing(newOngoing)
    e.currentTarget.task.value = ""
    e.currentTarget.description.value = ""
    e.currentTarget.dueDate.value = ""
    setIsUpdateModalOpen(false)
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

  const moveTask = (task: taskProp) => {
    setItemSelected(task)
    setActiveTag(state[task.status as keyof typeof state]);
    setDisplayOptions(true)
  }



  return (
    <div className="">
      <Navbar setIsModalOpen={setIsModalOpen}/>
      
      <div className="w-screen md:max-w-7xl md:mx-auto px-4 pt-10 sm:px-6 xl:pr-0">
        <div className="flex flex-col gap-4">

        <AddTaskModal handleSubmit={handleSubmit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <TaskDetailsModal itemSelected={itemSelected!} onVerify={handleUpdate} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen}/>
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
          }
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Column title="New" tasks={newTask} moveTask={moveTask} />
              <Column title="Ongoing" tasks={ongoing} moveTask={moveTask} />
              <Column title="Done" tasks={done} moveTask={moveTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client"

import { useState } from "react"
import { taskProp } from "./types/types"
import Board from "./components/Board"
import { doneDemoTasks, newDemoTasks, ongoingDemoTasks } from "./utils"

export default function Home() {
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

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 p-4">

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4 sm:w-1/2">
            <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">New Task</div>
            <input placeholder="Enter title" name="task" className="border border-gray-300 rounded p-2" />
            <textarea placeholder="Enter description" name="description" className="border border-gray-300 rounded p-2" />
            <input type="date" name="dueDate" className="border border-gray-300 rounded p-2" />
            <input type="submit" value="Add" className="border border-gray-300 rounded p-2" />
          </form>
        </div>
        {
          displayOptions && <div className="move-process">
            <h2>Move towards?</h2>
            <div className="flex gap-2">
              {activeTag !== 0 && <button className="border border-gray-300 rounded p-2" onClick={() => shiftTask(0, itemSelected!)}>New</button>}
              {activeTag !== 1 && <button className="border border-gray-300 rounded p-2" onClick={() => shiftTask(1, itemSelected!)}>Ongoing</button>}
              {activeTag !== 2 && <button className="border border-gray-300 rounded p-2" onClick={() => shiftTask(2, itemSelected!)}>Done</button>}
            </div>
          </div>
        }

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold underline">Todo List</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Board title="New" tasks={newTask} state={0} moveTask={moveTask} />
            <Board title="Ongoing" tasks={ongoing} state={1} moveTask={moveTask} />
            <Board title="Done" tasks={done} state={2} moveTask={moveTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

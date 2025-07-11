"use client"

import { useState } from "react"
import { taskProp } from "./types/types"
import Board from "./components/Board"
import { doneDemoTasks, newDemoTasks, ongoingDemoTasks } from "./utils"

export default function Home() {
  const [newTask, setNewTask] = useState<taskProp[]>(newDemoTasks)
  const [ongoing, setOngoing] = useState<taskProp[]>(ongoingDemoTasks)
  const [done, setDone] = useState<taskProp[]>(doneDemoTasks)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newItem = { id: crypto.randomUUID(), title: e.currentTarget.task.value, status: "new", description: e.currentTarget.description.value, dueDate: "" };
    setNewTask([newItem, ...newTask])
    e.currentTarget.task.value = ""
    e.currentTarget.description.value = ""
    e.currentTarget.dueDate.value = ""
  }

  const shiftTask = (index: number, task: taskProp) => {
    if (index === 0) {
    setOngoing([ ...ongoing, {...task, status: "ongoing"}])
    setNewTask(newTask.filter((newTask) => newTask.title !== task.title))
    } else if (index === 1) {
    setDone([ ...done, {...task, status: "done"}])
    setOngoing(ongoing.filter((ongoing) => ongoing.title !== task.title))
    } else {
      setDone(done.filter((done) => done.title !== task.title))
  }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 p-4">

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4 w-1/2">
          <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">New Task</div>
          <input placeholder="Enter title" name="task" className="border border-gray-300 rounded p-2" />
          <textarea placeholder="Enter description" name="description" className="border border-gray-300 rounded p-2" />
          <input type="date" name="dueDate" className="border border-gray-300 rounded p-2" />
          <input type="submit" value="Add" className="border border-gray-300 rounded p-2" />
        </form>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold underline">Todo List</h1>
          <div className="grid md:grid-flow-col gap-4">
            <Board title="New" tasks={newTask} state={0} shiftTask={shiftTask}/>
            <Board title="Ongoing" tasks={ongoing} state={1} shiftTask={shiftTask}/>
            <Board title="Done" tasks={done} state={2} shiftTask={shiftTask}/>
          </div>
        </div>
      </div>
    </div>
  );
}

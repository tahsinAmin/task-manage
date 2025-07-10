"use client"

import { useState } from "react"

export default function Home() {
  const [newTask, setNewTask] = useState<string[]>(["new 1", "new 2", "new 3"])
  const [ongoing, setOngoing] = useState<string[]>(["ongoing 1", "ongoing 2", "ongoing 3"])
  const [done, setDone] = useState<string[]>(["done 1", "done 2", "done 3"])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.currentTarget.task.value)
    setNewTask([e.currentTarget.task.value, ...newTask])
    e.currentTarget.task.value = ""
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 p-4">

        <form onSubmit={handleSubmit}>
          <input type="text" name="task" className="border border-gray-300 rounded p-2" />
          <input type="submit" value="Add" className="border border-gray-300 rounded p-2"/>
        </form>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold underline">Todo List</h1>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Todo</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {newTask.map((newTask) => (
                  <li key={newTask} className="text-xl">{newTask}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Ongoing</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {ongoing.map((ongoing) => (
                  <li key={ongoing} className="text-xl">{ongoing}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Done</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {done.map((done) => (
                  <li key={done} className="text-xl">{done}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

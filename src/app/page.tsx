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

  const moveToOngoing = (task: string) => {
    setOngoing([...ongoing, task])
    setNewTask(newTask.filter((newTask) => newTask !== task))
  }

  const moveToDone = (task: string) => {
    setDone([...done, task])
    setOngoing(ongoing.filter((ongoing) => ongoing !== task))
  }

  const removeDone = (task: string) => {
    setDone(done.filter((done) => done !== task))
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
                  <li key={newTask} className="text-xl">{newTask} <button onClick={() => moveToOngoing(newTask)}>Move</button></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Ongoing</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {ongoing.map((ongoing) => (
                  <li key={ongoing} className="text-xl">{ongoing} <button onClick={() => moveToDone(ongoing)}>Move</button></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Done</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {done.map((done) => (
                  <li key={done} className="text-xl">{done} <button onClick={() => removeDone(done)}>Move</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"

type taskProp = {
  id: string,
  title: string,
  status: string,
  description: string
}

export default function Home() {
  const [newTask, setNewTask] = useState<taskProp[]>([{id: "1", title:"new 1", status:"new", description:"new 1"}, {id: "2", title:"new 2", status:"new", description:"new 2"}, {id: "3", title:"new 3", status:"new", description:"new 3"}])
  const [ongoing, setOngoing] = useState<taskProp[]>([{id: "4", title:"ongoing 1", status:"ongoing", description:"ongoing 1"}, {id: "5", title:"ongoing 2", status:"ongoing", description:"ongoing 2"}, {id: "6", title:"ongoing 3", status:"ongoing", description:"ongoing 3"}])
  const [done, setDone] = useState<taskProp[]>([{id: "7", title:"done 1", status:"done", description:"done 1"}, {id: "8", title:"done 2", status:"done", description:"done 2"}, {id: "9", title:"done 3", status:"done", description:"done 3"}])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newItem = { id: crypto.randomUUID(), title: e.currentTarget.task.value, status: "new", description: e.currentTarget.description.value };
    setNewTask([newItem, ...newTask])
    e.currentTarget.task.value = ""
    e.currentTarget.description.value = ""
  }

  const moveToOngoing = (task: taskProp) => {
    setOngoing([ ...ongoing, {...task, status: "ongoing"}])
    setNewTask(newTask.filter((newTask) => newTask.title !== task.title))
  }

  const moveToDone = (task: taskProp) => {
    setDone([ ...done, {...task, status: "done"}])
    setOngoing(ongoing.filter((ongoing) => ongoing.title !== task.title))
  }

  const removeDone = (task: taskProp) => {
    setDone(done.filter((done) => done.title !== task.title))
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 p-4">

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4 w-1/2">
          <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">New Task</div>
          <input placeholder="Enter title" name="task" className="border border-gray-300 rounded p-2" />
          <textarea placeholder="Enter description" name="description" className="border border-gray-300 rounded p-2" />
          <input type="submit" value="Add" className="border border-gray-300 rounded p-2"/>
        </form>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold underline">Todo List</h1>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Todo</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {newTask.map((newTask) => (
                  <li key={newTask.id} className="text-xl">{newTask.title} <button onClick={() => moveToOngoing(newTask)}>Move</button></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Ongoing</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {ongoing.map((ongoing) => (
                  <li key={ongoing.id} className="text-xl">{ongoing.title} <button onClick={() => moveToDone(ongoing)}>Move</button></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Done</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {done.map((done) => (
                  <li key={done.id} className="text-xl">{done.title} <button onClick={() => removeDone(done)}>Remove</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

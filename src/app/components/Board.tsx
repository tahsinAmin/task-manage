"use client"

import { useState, useEffect } from "react"
import { taskProp } from "../types"
import { demoTasks, populateData, state } from "../utils"
import { AddTaskModal, TaskDetailsModal } from "./Modals"
import { OptionsListMenu } from "./OptionsListMenu"
import Dnd from "./dnd"



const initialObjectsOfArray = populateData();

export const Board = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [newTask, setNewTask] = useState<taskProp[]>(initialObjectsOfArray.new);
  const [ongoing, setOngoing] = useState<taskProp[]>(initialObjectsOfArray.ongoing);
  const [done, setDone] = useState<taskProp[]>(initialObjectsOfArray.done);
  const [tasks, setTasks] = useState<taskProp[]>(demoTasks)

  const [activeTag, setActiveTag] = useState<number>(-1);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<taskProp | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const localNew = localStorage.getItem("newTask");
    const localOngoing = localStorage.getItem("ongoing");
    const localDone = localStorage.getItem("done");
    if (localNew) setNewTask(JSON.parse(localNew));
    if (localOngoing) setOngoing(JSON.parse(localOngoing));
    if (localDone) setDone(JSON.parse(localDone));
  }, []);

  useEffect(() => {
    localStorage.setItem("newTask", JSON.stringify(newTask));
  }, [newTask]);

  useEffect(() => {
    localStorage.setItem("ongoing", JSON.stringify(ongoing));
  }, [ongoing]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newItem = { id: crypto.randomUUID(), title: e.currentTarget.task.value, status: "new" as const, description: e.currentTarget.description.value, dueDate: "" };
    setTasks([newItem, ...tasks]);
    e.currentTarget.task.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.dueDate.value = "";
    setIsModalOpen(false)
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let newArrOfObjects = tasks;

    for (let i = 0; i < newArrOfObjects.length; i++) {
      if (newArrOfObjects[i].id === itemSelected?.id) {
        newArrOfObjects[i].title = e.currentTarget.task.value;
        newArrOfObjects[i].description = e.currentTarget.description.value;
        newArrOfObjects[i].dueDate = e.currentTarget.dueDate.value;
      }
    }

    setTasks(newArrOfObjects);
    e.currentTarget.task.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.dueDate.value = "";
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
    <div role="main" className="md:max-w-6xl md:mx-auto px-4 pt-10 sm:px-6 xl:pr-0">
      <div className="flex flex-col gap-4">

        <AddTaskModal handleSubmit={handleSubmit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <TaskDetailsModal itemSelected={itemSelected!} onVerify={handleUpdate} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} />

          {displayOptions &&
            <OptionsListMenu
              activeTag={activeTag}
              shiftTask={shiftTask}
              itemSelected={itemSelected!}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              setDisplayOptions={setDisplayOptions}
            />
          }
          <Dnd moveTask={moveTask} tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
  );
}
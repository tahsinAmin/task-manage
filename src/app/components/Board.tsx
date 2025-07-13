"use client"

import { useState, useEffect } from "react"
import { taskProp } from "../types"
import Column from "./Column"
import { populateData, state } from "../utils"
import { AddTaskModal, TaskDetailsModal } from "./Modals"
import { OptionsListMenu } from "./OptionsListMenu"
import { useModal } from "@/context/ModalContext"

const initialObjectsOfArray = populateData();

export const Board = () => {
  const { setIsModalOpen, setIsUpdateModalOpen } = useModal();

  const [newTask, setNewTask] = useState<taskProp[]>(initialObjectsOfArray.new);
  const [ongoing, setOngoing] = useState<taskProp[]>(initialObjectsOfArray.ongoing);
  const [done, setDone] = useState<taskProp[]>(initialObjectsOfArray.done);
  const [activeTag, setActiveTag] = useState<number>(-1);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<taskProp | null>(null);
  const [movedToOngoing, setMovedToOngoing] = useState<boolean>(false);

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

  useEffect(() => {
    if (movedToOngoing) {
      setIsUpdateModalOpen(true);
    }
  }, [movedToOngoing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newItem = { id: crypto.randomUUID(), title: e.currentTarget.task.value, status: "new" as const, description: e.currentTarget.description.value, dueDate: "" };
    setNewTask([newItem, ...newTask]);
    e.currentTarget.task.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.dueDate.value = "";
    setIsModalOpen(false)
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let newArrOfObjects;

    if (itemSelected?.status === "ongoing") {
      newArrOfObjects = [...ongoing]
    } else if (itemSelected?.status === "done") {
      newArrOfObjects = [...done]
    } else {
      newArrOfObjects = [...newTask]
    }

    for (let i = 0; i < newArrOfObjects.length; i++) {
      if (newArrOfObjects[i].id === itemSelected?.id) {
        newArrOfObjects[i] = { ...newArrOfObjects[i], title: e.currentTarget.task.value, description: e.currentTarget.description.value, dueDate: e.currentTarget.dueDate.value }
        break;
      }
    }

    if (itemSelected?.status === "ongoing") {
      setOngoing(newArrOfObjects);
      setMovedToOngoing(false);
    } else if (itemSelected?.status === "done") {
      setDone(newArrOfObjects);
    } else {
      setNewTask(newArrOfObjects);
    }
    e.currentTarget.task.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.dueDate.value = "";
    setIsUpdateModalOpen(false)
  }

  const shiftTask = (index: number, task: taskProp) => {
    setDisplayOptions(false)
    if (task.status === "new") {
      setNewTask(newTask.filter((newTask) => newTask.title !== task.title));
    } else if (task.status === "ongoing") {
      setOngoing(ongoing.filter((ongoing) => ongoing.title !== task.title));
    } else {
      setDone(done.filter((done) => done.title !== task.title));
    }

    if (index === 0) {
      setNewTask([...newTask, { ...task, status: "new" }])
    } else if (index === 1) {
      setOngoing([...ongoing, { ...task, status: "ongoing" }])
      setItemSelected({ ...task, status: "ongoing" })
      setMovedToOngoing(true);
    } else {
      setDone([...done, { ...task, status: "done" }])
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

        <AddTaskModal handleSubmit={handleSubmit} />
        <TaskDetailsModal itemSelected={itemSelected!} onVerify={handleUpdate} />

        {displayOptions &&
          <OptionsListMenu
            activeTag={activeTag}
            shiftTask={shiftTask}
            itemSelected={itemSelected!}
            setDisplayOptions={setDisplayOptions}
          />
        }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <Column title="New" tasks={newTask} moveTask={moveTask} />
          <Column title="Ongoing" tasks={ongoing} moveTask={moveTask} />
          <Column title="Done" tasks={done} moveTask={moveTask} />
        </div>
      </div>
    </div>
  );
}
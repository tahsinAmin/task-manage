"use client"

import "./ContextMenu/ContextMenu.css";
import { useState, useEffect, useRef } from "react";
import { taskProp } from "../types"
import { indexToStatus, populateData, state, Status } from "../utils"
import { AddTaskModal, TaskDetailsModal } from "./Modals"
import { OptionsListMenu } from "./OptionsListMenu"
import { useModal } from "@/context/ModalContext"
import Dnd from "./dnd"



const initialTasks = populateData();

export const Board = () => {
  const { setIsModalOpen, setIsUpdateModalOpen } = useModal();

  const [tasks, setTasks] = useState<taskProp[]>(initialTasks)

  const [activeTag, setActiveTag] = useState<number>(-1);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<taskProp | null>(null);
  const [movedToOngoing, setMovedToOngoing] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const localAllTasks = localStorage.getItem("allTasks");
    if (localAllTasks) setTasks(JSON.parse(localAllTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (movedToOngoing) {
      setIsUpdateModalOpen(true);
    }
  }, [movedToOngoing]);

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
        newArrOfObjects[i] = { ...newArrOfObjects[i], title: e.currentTarget.task.value, description: e.currentTarget.description.value, dueDate: e.currentTarget.dueDate.value }
        break;
      }
    }
    setMovedToOngoing(false);
    e.currentTarget.task.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.dueDate.value = "";
    setIsUpdateModalOpen(false)
    setTasks([...newArrOfObjects]);
  }

  const shiftTask = (index: number, task: taskProp) => {
    setDisplayOptions(false)
    const taskStatus = indexToStatus[index] as Status;
    const newTasks: taskProp[] = [...tasks];
    const taskIndex = newTasks.findIndex((someTask) => someTask.id === task.id);
    
    newTasks.splice(taskIndex, 1);
    newTasks.push({ ...newTasks[taskIndex], status: taskStatus });
    setTasks(newTasks);

    if (taskStatus === "ongoing") {
      setItemSelected({ ...task, status: "ongoing" })
      setMovedToOngoing(true);
    }
  }

  const moveTask = (task: taskProp) => {
    setItemSelected(task)
    setActiveTag(state[task.status as keyof typeof state]);
    setDisplayOptions(true)
  }

  return (
    <div role="main" className="md:max-w-6xl md:mx-auto px-4 pt-10 sm:px-6 xl:pr-0">
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
      <Dnd moveTask={moveTask} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
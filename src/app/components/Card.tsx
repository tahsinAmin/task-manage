import React from "react";
import { taskProp } from "../types";
import { useDrag } from "../hooks/useDrag";
const dateToday = new Date().setHours(0, 0, 0, 0);

const Card = ({ task, moveTask, handleOnContextMenu }: { task: taskProp, moveTask: (task: taskProp) => void, handleOnContextMenu: (e: React.MouseEvent, task: taskProp) => void }) => {
  const { handleDragStart, handleDragEnd } = useDrag({});
  const cardDate = new Date(task.dueDate);
  const dateString = cardDate.setHours(0, 0, 0, 0);
  const cardDateString = cardDate.toDateString();
  const overDue = (dateToday > dateString && task.status !== "done")

  return (
    <li
      role="listitem"
      className={`card ${task.selected ? "selected" : ""}`}
      onContextMenu={(e) => handleOnContextMenu(e, task)}
      onClick={() => moveTask(task)}
      draggable onDragStart={(e) => handleDragStart(e, task.id)} onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className="absolute inset-0 rounded-2xl"></div>
      <div className="relative z-10">
        <span className={`inline-block tag-${task.status} text-xs px-2 py-1 rounded-full mb-4 shadow-md capitalize`}>
          {task.status}
        </span>

        <h2 className="card-title">
          {task.title}
        </h2>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
          {task.description}
        </p>

        {task.dueDate !== "" ? (<div className="flex items-center justify-end">
          <div className="flex items-center text-gray-400">
            {overDue ?
              <p className="text-xs font-medium mr-2 text-red-500">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg> Overdue!{" "}
                </span>
                <span>{cardDateString}</span>
              </p> :
              <span className='text-xs font-medium mr-2'>{cardDateString}</span>
            }
          </div>
        </div>) : ("")}
      </div>
    </li>
  );
};

export default React.memo(Card);
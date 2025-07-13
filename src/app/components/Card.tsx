import React from "react";
import { taskProp } from "../types";
import { useDrag } from "../hooks/useDrag";
const dateToday = new Date().setHours(0, 0, 0, 0);

const Card = ({ task, moveTask }: { task: taskProp, moveTask: (task: taskProp) => void }) => {
  const { handleDragStart, handleDragEnd } = useDrag({});
  const cardDate = new Date(task.dueDate);
  const dateString = cardDate.setHours(0, 0, 0, 0);
  const cardDateString = cardDate.toDateString();

  return (
    <li
      className="h-[169px] rounded-[20px] shadow-xl p-3 w-full xl:w-[345px] relative overflow-hidden border-2 border-gray-200"
      onClick={() => moveTask(task)}
      draggable onDragStart={(e) => handleDragStart(e, task.id)} onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className="absolute inset-0 rounded-2xl"></div>
      <div className="relative z-10">
        <span className={`inline-block tag-${task.status} text-xs px-2 py-1 rounded-full mb-4 shadow-md capitalize`}>
          {task.status}
        </span>

        <h2 className="text-md font-bold mb-2 leading-tight line-clamp-1">
          {task.title}
        </h2>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
          {task.description}
        </p>

        {task.dueDate !== "" ? (<div className="flex items-center justify-end">
          <div className="flex items-center text-gray-400">
            <span
              className={`text-xs font-medium mr-2 ${
                dateString < dateToday && task.status !== "done"
                  ? "text-red-500"
                  : ""
              }`}
            >
              {cardDateString}
            </span>
          </div>
        </div>) : ("")}
      </div>
    </li>
  );
};

export default React.memo(Card);
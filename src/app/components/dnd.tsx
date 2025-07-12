"use client"

import { useState } from "react";
import { demoTasks } from "../utils";

interface Task {
    id: string;
    title: string;
    status: string;
    description: string;
    dueDate: string;
}

const Dnd = () => {
    const [tasks, setTasks] = useState<Task[]>(demoTasks)

    const [dropIndicator, setDropIndicator] = useState<string | null>(null);

    const renderTasks = (status: string) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={(e) => handleDragEnd(e)}
                    className="w-full p-2 bg-gray-100 rounded"
                >{task.title}</div>
            ));
    };
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData("text/plain", taskId.toString());
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.clearData();
        setDropIndicator(null);
    }


    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        setTasks((prevTasks) => {
            return prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, status }
                }
                return task;
            })
        });
    }


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
        setDropIndicator(status);
    }

    return (
        <div className="flex flex-col p-6">
            <div className="grid sm:grid-cols-3 gap-2">
                <div>
                    <h2 className="text-2xl font-bold sm:text-center">Todo</h2>
                    <div
                        id="new"
                        onDrop={(e) => handleDrop(e, "new")}
                        onDragOver={(e) => handleDragOver(e, "new")}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded min-h-[200px] ${dropIndicator === 'new' ? 'bg-blue-200' : ''
                            }`}
                    >
                        {renderTasks("new")}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold sm:text-center">In Progress</h2>
                    <div
                        id="ongoing"
                        onDrop={(e) => handleDrop(e, "ongoing")}
                        onDragOver={(e) => handleDragOver(e, "ongoing")}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded min-h-[200px] ${dropIndicator === 'ongoing' ? 'bg-blue-200' : ''
                            }`}
                    >
                        {renderTasks("ongoing")}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold sm:text-center">Done</h2>
                    <div id="done"
                        onDrop={(e) => handleDrop(e, "done")}
                        onDragOver={(e) => handleDragOver(e, "done")}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded min-h-[200px] ${dropIndicator === 'done' ? 'bg-blue-200' : ''
                            }`}
                    >
                        {renderTasks("done")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dnd
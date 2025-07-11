"use client"

import { useState } from "react";

interface Task {
    id: number;
    title: string;
    status: string;
}

const Dnd = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Task 1", status: "todo" },
        { id: 2, title: "Task 2", status: "todo" },
        { id: 3, title: "Task 3", status: "todo" }
    ])

    const [dropIndicator, setDropIndicator] = useState<string | null>(null);
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number) => {
        e.dataTransfer.setData("text/plain", taskId.toString());
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.clearData();
        setDropIndicator(null);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDropIndicator(e.currentTarget.id);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        setTasks((prevTasks) => {
            return prevTasks.map(task => {
                if (task.id === +taskId) {
                    return { ...task, status }
                }
                return task;
            })
        });
        setDropIndicator(null);
    }

    const renderTasks = (status: string) => {
        console.log(tasks);
        return tasks.filter(task => task.status === status)
            .map(task => {
                return <div
                 key={task.id}
                 draggable
                 onDragStart={(e) => {
                    handleDragStart(e, task.id)
                }}
                onDragEnd={(e) => {
                    handleDragEnd(e)
                }}
                onDragOver={(e) => {
                    handleDragOver(e)
                }}
                onDrop={(e) => {
                    handleDrop(e)
                }}
                className="w-full p-2 bg-gray-100 rounded"
                >{task.title}</div>
            })
    }

    return (
        <div className="flex flex-col p-6 h-screen">
            <div className="grid grid-cols-3 gap-2">
                <h2 className="text-center">todo</h2>
                <h2 className="text-center">In Progress</h2>
                <h2 className="text-center">Done</h2>

                <div
                    id="todo"
                    onDrop={(e) => handleDrop(e, "todo")}
                    className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded ${dropIndicator === 'todo' ? 'bg-blue-200' : ''
                        }`}
                >
                    {renderTasks("todo")}
                </div>
                <div
                    id="in-progress"
                    className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded ${dropIndicator === 'in-progress' ? 'bg-blue-200' : ''
                        }`}
                >
                    {renderTasks("in-progress")}
                </div>

                <div id="done"
                    className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded ${dropIndicator === 'done' ? 'bg-blue-200' : ''
                        }`}
                >
                    {renderTasks("done")}
                </div>
            </div>
        </div>
    )
}

export default Dnd
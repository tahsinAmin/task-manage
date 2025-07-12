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
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number) => {
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
                if (task.id === +taskId) {
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
                        id="todo"
                        onDrop={(e) => handleDrop(e, "todo")}
                        onDragOver={(e) => handleDragOver(e, "todo")}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded min-h-[200px] ${dropIndicator === 'todo' ? 'bg-blue-200' : ''
                            }`}
                    >
                        {renderTasks("todo")}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold sm:text-center">In Progress</h2>
                    <div
                        id="in-progress"
                        onDrop={(e) => handleDrop(e, "in-progress")}
                        onDragOver={(e) => handleDragOver(e, "in-progress")}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded min-h-[200px] ${dropIndicator === 'in-progress' ? 'bg-blue-200' : ''
                            }`}
                    >
                        {renderTasks("in-progress")}
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
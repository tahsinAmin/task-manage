"use client"

import { useState } from "react";

interface Task {
    id: number;
    title: string;
    status: string;
}

const Dnd = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Task 1", status: "New" },
        { id: 2, title: "Task 2", status: "Ongoing" },
        { id: 3, title: "Task 3", status: "Done" }
    ])

    const [dropIndicator, setDropIndicator] = useState<string | null>(null);

    const renderTasks = (status: string) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <div
                    key={task.id} className="w-full p-2 bg-gray-100 rounded">
                    <h2>{task.title}</h2>
                </div>
            ))
    }

    return (
        <div className="flex flex-col p-6 h-screen">
            <div className="grid grid-cols-3 gap-2">
                <h2 className="text-center">New</h2>
                <h2 className="text-center">In Progress</h2>
                <h2 className="text-center">Done</h2>

                <div 
                    id="todo"
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
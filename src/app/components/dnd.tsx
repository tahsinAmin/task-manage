"use client"

import { useState } from "react";
import { demoTasks } from "../utils";
import { taskProp } from "../types";
import Card from "./Card";
import { useDrop } from "../hooks/useDrop";

interface Task {
    id: string;
    title: string;
    status: string;
    description: string;
    dueDate: string;
}

const Dnd = ({moveTask}: {moveTask: (task: taskProp) => void}) => {
    const [tasks, setTasks] = useState<Task[]>(demoTasks)

    const [dropIndicator, setDropIndicator] = useState<string | null>(null);

    const renderTasks = (status: string) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <Card key={task.id} task={task} moveTask={moveTask} />
            ));
    };
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, taskId: string) => {
        e.dataTransfer.setData("text/plain", taskId.toString());
    }

    const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
        e.dataTransfer.clearData();
        setDropIndicator(null);
    }


    // Modular drop logic for each column
    const getDropProps = (status: string) => {
        return useDrop({
            onDrop: (_e, taskId) => {
                setTasks(prevTasks => {
                    const newTasks = [...prevTasks];
                    const taskIndex = newTasks.findIndex((task) => task.id === taskId);
                    if (taskIndex === -1) return newTasks;
                    const taskToMove = newTasks[taskIndex];
                    newTasks.splice(taskIndex, 1);
                    newTasks.push({ ...taskToMove, status });
                    return newTasks;
                });
                setDropIndicator(null);
            },
            onDragOver: () => setDropIndicator(status)
        });
    };

    const todoDrop = getDropProps("new");
    const ongoingDrop = getDropProps("ongoing");
    const doneDrop = getDropProps("done");

    return (
        <div className="flex flex-col p-6">
            <div className="grid sm:grid-cols-3 gap-2">
                <div>
                    <h2 className="text-2xl font-bold sm:text-center">Todo</h2>
                    <ul
                        id="new"
                        onDrop={todoDrop.handleDrop}
                        onDragOver={todoDrop.handleDragOver}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded  sm:min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-200px)] ${dropIndicator === 'new' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("new")}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold sm:text-center">In Progress</h2>
                    <ul
                        id="ongoing"
                        onDrop={ongoingDrop.handleDrop}
                        onDragOver={ongoingDrop.handleDragOver}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded  sm:min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-200px)] ${dropIndicator === 'ongoing' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("ongoing")}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold sm:text-center">Done</h2>
                    <ul id="done"
                        onDrop={doneDrop.handleDrop}
                        onDragOver={doneDrop.handleDragOver}
                        className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 rounded sm:min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-200px)]] ${dropIndicator === 'done' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("done")}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dnd
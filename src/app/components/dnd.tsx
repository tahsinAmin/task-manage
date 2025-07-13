"use client"

import { useCallback, useState } from "react";
import { taskProp } from "../types";
import Card from "./Card";
import { useDrop } from "../hooks/useDrop";
import { populateData, Status } from "../utils";

interface DndProps {
    moveTask: (task: taskProp) => void,
    tasks: taskProp[],
    setTasks: (updater: taskProp[] | ((prevTasks: taskProp[]) => taskProp[])) => void,
    setItemSelected: (task: taskProp | null) => void,
    setMovedToOngoing: (value: boolean) => void
}

const Dnd = ({ moveTask, tasks, setTasks, setItemSelected, setMovedToOngoing }: DndProps) => {
    const [dropIndicator, setDropIndicator] = useState<Status | null>(null);

    const renderTasks = (status: Status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <Card key={task.id} task={task} moveTask={moveTask} />
            ));
    };


    // Modular drop logic for each column
    const getDropProps = useCallback((status: Status) => {
        return useDrop({
            onDrop: (_e, taskId) => {
                const newTasks: taskProp[] = populateData();
                const taskIndex = newTasks.findIndex((task) => task.id === taskId);
                if (taskIndex === -1) return newTasks;
                const taskToMove = newTasks[taskIndex];
                newTasks.splice(taskIndex, 1);
                newTasks.push({ ...taskToMove, status });

                if (status === "ongoing") {
                    setItemSelected({ ...taskToMove, status });
                    setMovedToOngoing(true);
                }
                setTasks([...newTasks]);
                setDropIndicator(null);
            },
            onDragOver: () => setDropIndicator(status)
        });
    }, []);

    const todoDrop = getDropProps("new");
    const ongoingDrop = getDropProps("ongoing");
    const doneDrop = getDropProps("done");

    return (
        <div className="flex flex-col p-6">
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-2">
                <div>
                    <h2 className="card-title ml-4">Todo</h2>
                    <ul
                        role="list"
                        id="new"
                        onDrop={todoDrop.handleDrop}
                        onDragOver={todoDrop.handleDragOver}
                        className={`column ${dropIndicator === 'new' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("new")}
                    </ul>
                </div>
                <div>
                    <h2 className="card-title ml-4">In Progress</h2>
                    <ul
                        role="list"
                        id="ongoing"
                        onDrop={(e) => { ongoingDrop.handleDrop(e); }}
                        onDragOver={ongoingDrop.handleDragOver}
                        className={`column ${dropIndicator === 'ongoing' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("ongoing")}
                    </ul>
                </div>

                <div>
                    <h2 className="card-title ml-4">Done</h2>
                    <ul role="list" id="done"
                        onDrop={doneDrop.handleDrop}
                        onDragOver={doneDrop.handleDragOver}
                        className={`column ${dropIndicator === 'done' ? 'bg-blue-200' : ''}`}
                    >
                        {renderTasks("done")}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dnd
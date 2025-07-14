"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { taskProp } from "../types";
import Card from "./Card";
import { useDrop } from "../hooks/useDrop";
import { populateData, Status } from "../utils";
import { ContextMenu } from "./ContextMenu";

interface DndProps {
    moveTask: (task: taskProp) => void,
    tasks: taskProp[],
    setTasks: (updater: taskProp[] | ((prevTasks: taskProp[]) => taskProp[])) => void,
    setItemSelected: (task: taskProp | null) => void,
    setMovedToOngoing: (value: boolean) => void
}

const Dnd = ({ moveTask, tasks, setTasks, setItemSelected, setMovedToOngoing }: DndProps) => {
  const contextMenuRef = useRef<HTMLMenuElement>(null);
  const [contextMenu, setContextMenu] = useState({
    position: { 
            x: 0,
            y: 0 
        },
        toggled: false,
    });

  useEffect(() => {
    function handler (e) {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          resetContextMenu();
        }
      }
    }
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    }
  }, [contextMenu]);
  
  const handleOnContextMenu = (e: React.MouseEvent, rightClickedTask: any) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
    const isLeft = e.clientX < window?.innerWidth / 2;
    let x
    let y =  e.clientY

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - contextMenuAttr?.width
    } 
    
    setContextMenu({
      position: {
        x, 
        y
      },
      toggled: true,
    });
    
    
    // Update the selected state for the person
    setTasks(
      tasks.map(task => ({
      ...task,
      selected: task.id === rightClickedTask.id
    }))
    );
    console.log(rightClickedTask);
  };

  function resetContextMenu() {
    setTasks(
      tasks.map(task => ({
      ...task,
      selected: false
    }))
    );
    setContextMenu({
      position: { 
        x: 0,
        y: 0 
      },
      toggled: false,
    });
  }


    const [dropIndicator, setDropIndicator] = useState<Status | null>(null);

    const renderTasks = (status: Status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <Card key={task.id} task={task} moveTask={moveTask} handleOnContextMenu={handleOnContextMenu} />
            ));
    };


    // Modular drop logic for each column
    const GetDropProps = (status: Status) => {
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
    };

    const todoDrop = GetDropProps("new");
    const ongoingDrop = GetDropProps("ongoing");
    const doneDrop = GetDropProps("done");

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
                <ContextMenu
                    contextMenuRef={contextMenuRef}
                    isToggled={contextMenu.toggled}
                    positionX={contextMenu.position.x}
                    positionY={contextMenu.position.y}
                    buttons={[
                        {
                            text: "Do Something",
                            icon: "😀",
                            onClick: () => alert("Hello"),
                            isSpacer: false,
                        },
                        {
                            text: "Do Something else",
                            icon: "😀",
                            onClick: () => alert("Bye"),
                            isSpacer: false,
                        },
                        {
                            text: "",
                            icon: "",
                            onClick: () => null,
                            isSpacer: true,
                        },
                        {
                            text: "Do Something New",
                            icon: "😀",
                            onClick: () => alert("world"),
                            isSpacer: false,
                        },
                    ]}
                    rightClickItem={contextMenu?.rightClickItem}
                />
            </div>
        </div>
    )
}

export default Dnd
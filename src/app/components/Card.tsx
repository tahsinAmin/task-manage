import { taskProp } from "../types";
const dateTodayString = new Date().toDateString();

const Card = ({ task, moveTask, handleDragStart, handleDragEnd }: { task: taskProp, moveTask: (task: taskProp) => void, handleDragStart: (e: React.DragEvent<HTMLLIElement>, taskId: string) => void, handleDragEnd: (e: React.DragEvent<HTMLLIElement>) => void }) => {
    const dateString = new Date(task.dueDate).toDateString()
    
    return (
        <li draggable onDragStart={(e) => handleDragStart(e, task.id)}
        onDragEnd={(e) => handleDragEnd(e)}
        className="rounded-[20px] shadow-xl p-3 xl:w-[345px] relative overflow-hidden border-2 border-gray-200" onClick={() => moveTask(task)}>
            <div className="absolute inset-0 rounded-2xl"></div>
            <div className="relative z-10">
                <span className={`inline-block tag-${task.status} text-xs px-2 py-1 rounded-full mb-4 shadow-md capitalize`}>
                {task.status}
                </span>

                <h2 className="text-md font-bold mb-2 leading-tight line-clamp-1">
                    {task.title}
                </h2>

                <p className="text-gray-500 text-base mb-5 line-clamp-2">
                    {task.description}
                </p>

                <div className="flex items-center justify-end">
                    <div className="flex items-center text-gray-400">
                        <span className={`text-sm font-medium mr-2 ${dateString === dateTodayString ? 'text-red-500' : ''}`}>{dateString}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Card;
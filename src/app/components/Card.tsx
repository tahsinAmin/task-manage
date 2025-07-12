import { taskProp } from "../types";

const Card = ({ task, moveTask, state }: { task: taskProp, moveTask: (task: taskProp, state: number) => void, state: number }) => {
    return (
        <li className=" rounded-[20px] shadow-xl p-3 xl:w-[345px] relative overflow-hidden border-2 border-gray-200" onClick={() => moveTask(task, state)}>
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
                        <span className="text-sm font-medium mr-2">{task.dueDate}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Card;
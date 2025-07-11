import { taskProp } from "../types/types";

const Card = ({ task, moveTask, state }: { task: taskProp, moveTask: (task: taskProp, state: number) => void, state: number }) => {
    return (
        <li className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4">
            <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">{task.status}</div>
            <time className="block text-sm leading-6 text-gray-500 dark:text-gray-400">{task.dueDate}</time>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-200">{task.title}</h2>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{task.description}</p>
            <button onClick={() => moveTask(task, state)}>Move</button>
        </li>
    )
}

export default Card;
import { taskProp } from "../types/types"

interface BoardProps {
  title: string;
  tasks: taskProp[];
  state: number;
  moveTask: (task: taskProp, state: number) => void;
}

const Board = ({ title, tasks, state, moveTask }: BoardProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
          {tasks.map((task: taskProp) => (
            <li key={task.id} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4">
              <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">{task.status}</div>
              <time className="block text-sm leading-6 text-gray-500 dark:text-gray-400">{task.dueDate}</time>
              <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-200">{task.title}</h2>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{task.description}</p>
              <button onClick={() => moveTask(task, state)}>Move</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Board;
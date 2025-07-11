import { taskProp } from "../types/types"

const Board = ({title, tasks, state, shiftTask}: {title: string, tasks: any, state: number, shiftTask: any}) => {
    return (
        <div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                {tasks.map((task: taskProp) => (
                  <li key={task.id} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4">
                    <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">{task.status}</div>
                    <div className="text-xl">{task.title}</div>
                    <div>{task.description}</div>
                    <button onClick={() => shiftTask(state, task)}>Move</button>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    )
}

export default Board;
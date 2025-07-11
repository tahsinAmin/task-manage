import { taskProp } from "../types/types"
import Card from "./Card";

interface ColumnProps {
  title: string;
  tasks: taskProp[];
  state: number;
  moveTask: (task: taskProp, state: number) => void;
}

const Column = ({ title, tasks, state, moveTask }: ColumnProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul className="flex flex-col gap-2 border border-gray-300 rounded p-2">
          {tasks.map((task: taskProp) => (
            <Card key={task.id} task={task} moveTask={moveTask} state={state} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Column;
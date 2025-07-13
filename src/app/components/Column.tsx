import { taskProp } from "../types"
import Card from "./Card";

interface ColumnProps {
  title: string;
  tasks: taskProp[];
  moveTask: (task: taskProp) => void;
}

const Column = ({ title, tasks, moveTask }: ColumnProps) => {
  return (
    <div role="group" className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul role="list" className="flex flex-col gap-2 border border-gray-300 rounded p-2 sm:min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-200px)]">
        {tasks.map((task: taskProp) => (
          <Card key={task.id} task={task} moveTask={moveTask} />
        ))}
      </ul>
    </div>
  )
}

export default Column;
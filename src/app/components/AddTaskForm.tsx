"use client"

export const AddTaskForm = ({handleSubmit}: {handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void}) => {
    return (
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-4 border-gray-300 rounded-3xl p-4 sm:w-1/2">
            <div className="tag border border-gray-300 rounded-full p-2 display-inline w-fit">New Task</div>
            <input required placeholder="Enter title" name="task" className="border border-gray-300 rounded p-2" />
            <textarea placeholder="Enter description" name="description" className="border border-gray-300 rounded p-2" />
            <input type="date" name="dueDate" className="border border-gray-300 rounded p-2" />
            <input type="submit" value="Add" className="border border-gray-300 rounded p-2" />
          </form>
        </div>
    )
}

export default function Home() {
  const todo = ["new 1", "new 2", "new 3"]
  const ongoing = ["ongoing 1", "ongoing 2", "ongoing 3"]
  const done = ["done 1", "done 2", "done 3"]
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline">Todo List</h1>
      <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Todo</h2>
        <ul className="flex flex-col gap-2">
          {todo.map((todo) => (
            <li key={todo} className="text-xl">{todo}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Ongoing</h2>
        <ul className="flex flex-col gap-2">
          {ongoing.map((ongoing) => (
            <li key={ongoing} className="text-xl">{ongoing}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Done</h2>
        <ul className="flex flex-col gap-2">
          {done.map((done) => (
            <li key={done} className="text-xl">{done}</li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

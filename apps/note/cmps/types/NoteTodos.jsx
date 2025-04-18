const { useState } = React

export function NoteTodos({ info}) {

  const [todos, setTodos] = useState(info.todos)

  function handleToggle(idx) {
    const updated = todos.map((todo, i) =>
      i === idx ? { ...todo, doneAt: todo.doneAt ? null : Date.now() } : todo
    )
    setTodos(updated)
    if (onToggleTodo) onToggleTodo(updated)
  }

  return (
    <section className="note-todos">
      {info.title && <h4 className="todos-title">{info.title}</h4>}

      <ul className="clean-list">
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className={todo.doneAt ? 'done' : ''}
            onClick={() => handleToggle(idx)}
          >
            {todo.txt}
          </li>
        ))}
      </ul>
    </section>
  )
}

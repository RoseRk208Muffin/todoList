import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [search, setSearch] = useState("");

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;

    setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTodos = todos.filter((t) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    if (term === "finished") return t.completed;
    if (term === "pending") return !t.completed;
    return t.text.toLowerCase().includes(term);
  });

  return (
    <div className="app">
      <h1>📝 Todo List</h1>

      {/* Add Todo */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Add a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search todos (finished, pending, or keyword)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map((t) => (
          <li key={t.id} className="todo-item">
            <label className="todo-label">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
              />
              <span className={t.completed ? "done" : ""}>{t.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteTodo(t.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

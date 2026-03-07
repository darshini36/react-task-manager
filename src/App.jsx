import { useState, useEffect } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    setTasks(savedTasks);
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    if (input === "") return;

    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };
  return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#1e1e1e",
    color: "white",
    fontFamily: "Arial"
  }}>

    <div style={{
      background: "#2c2c2c",
      padding: "30px",
      borderRadius: "10px",
      width: "350px",
      textAlign: "center"
    }}>

      <h1>Task Manager</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "8px",
            width: "65%",
            marginRight: "5px"
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span
              onClick={() => toggleTask(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>

  </div>
);

}

export default App;
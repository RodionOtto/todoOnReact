import React, { useEffect } from "react";
import ToDoList from "./ToDo/ToDoList.js";
import Context from "./Context";
import Loader from "./Loader";

const AddToDo = React.lazy(() => import("./ToDo/AddToDo"));

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((tasks) => {
        setTimeout(() => {
          setTasks(tasks);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleCheckbox(id) {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeToDo(id) {
    setTasks(tasks.filter((todo) => todo.id !== id));
  }

  function addToDo(title) {
    setTasks(
      tasks.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeToDo }}>
      <div className="wrapper">
        <h1>React To Do List</h1>
        <React.Suspense
          fallback={<p style={{ visibility: "hidden" }}>Loading...</p>}
        >
          <AddToDo onCreate={addToDo} />
        </React.Suspense>

        {loading && <Loader />}
        {tasks.length ? (
          <ToDoList tasks={tasks} onToggle={toggleCheckbox} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

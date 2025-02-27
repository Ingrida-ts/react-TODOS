import "./App.css";
import Header from "./components/Header";
import FilterBtn from "./components/FilterBtn";
import TodoForm from "./components/TodoForm";
import { useState, useEffect, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./components/Todo";

interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

interface IFilterMap {
  All: () => boolean;
  Active: (task: ITask) => boolean;
  Completed: (task: ITask) => boolean;
}

interface IProps {
  tasks: Array<ITask>;
  filterName: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterMap: IFilterMap & { [key: string]: (...args: any[]) => boolean };
}

function App(props: IProps) {
  const [changeTasks, setChangeTasks] = useState(props.tasks);
  const [active, setActive] = useState("All");

  const deleteTask = useCallback((id: string) => {
    setChangeTasks((prevTasks) => prevTasks.filter((task) => id !== task.id));
  }, []);

  const addTask = useCallback((title: string) => {
    if (title === "") return;
    const newTask: ITask = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setChangeTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const editTask = useCallback((id: string | undefined, newTask: string) => {
    setChangeTasks((prevTasks) =>
      prevTasks.map((task) =>
        id === task.id ? { ...task, title: newTask } : task
      )
    );
  }, []);

  const toggleTaskCompleted = useCallback((id: string) => {
    setChangeTasks((prevTasks) =>
      prevTasks.map((task) =>
        id === task.id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const countTask = (
    <h2>Всего {changeTasks.length != 0 ? changeTasks.length : 0} задач</h2>
  );

  const filteredTasks = useMemo(() => {
    return changeTasks.filter(props.filterMap[active]);
  }, [changeTasks, active, props.filterMap]);

  const taskList = useMemo(() => {
    return filteredTasks.map((task) => (
      <Todo
        id={task.id}
        title={task.title}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  }, [filteredTasks, toggleTaskCompleted, deleteTask, editTask]);

  const filterList = useMemo(() => {
    return props.filterName.map((title) => (
      <FilterBtn key={title} title={title} setActive={setActive} />
    ));
  }, [props.filterName]);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(changeTasks));
    // console.log(JSON.parse(String(localStorage.getItem("todo"))));
  }, [changeTasks]);

  return (
    <>
      <Header />
      <TodoForm addTask={addTask} />
      {filterList}

      <main>
        {countTask}
        {taskList}
      </main>
    </>
  );
}

export default App;

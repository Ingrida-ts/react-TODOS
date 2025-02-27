import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

localStorage.setItem(
  "todo",
  JSON.stringify([
    {
      id: "dafsfaf23f",
      title: "adfadfs",
      completed: false,
    },
  ])
);

const todoDetails = JSON.parse(String(localStorage.getItem("todo")));

const filterMap = {
  All: () => true,
  Active: (task: ITask) => !task.completed,
  Completed: (task: ITask) => task.completed,
};
const filterName = Object.keys(filterMap);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App tasks={todoDetails} filterName={filterName} filterMap={filterMap} />
  </StrictMode>
);

import { useState, useCallback, useEffect } from "react";
import Button from "./Button/Button";
import { styled } from "styled-components";

const EditInput = styled.input`
  width: 400px;
  height: 10px;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const TaskInput = styled.input`
  margin: 2rem 1rem;
  padding: 0.5rem 3rem;
  width: 40px;
  height: 20px;
`;
const P = styled.p`
  font-weight: 500;
  font-size: 17px;
`;

const P1 = styled.p`
  text-decoration: line-through;
  font-weight: 500;
  font-size: 17px;
`;

interface ITaskProps {
  id: string;
  title: string;
  completed: boolean;
  deleteTask: (id: string) => void;
  editTask: (id: string | undefined, newTitle: string) => void;
  toggleTaskCompleted: (id: string) => void;
}

export default function Todo({
  id,
  title,
  completed,
  deleteTask,
  editTask,
  toggleTaskCompleted,
}: ITaskProps) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (completed && newTitle != title) {
        editTask(id, newTitle);
        setEdit(false);
        toggleTaskCompleted(id);
      } else {
        editTask(id, newTitle);
        setEdit(false);
      }
    },
    [editTask, id, newTitle, completed, title, toggleTaskCompleted]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }, []);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const viewTemplate = (
    <div>
      <div className="div">
        <TaskInput
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        {completed ? <P1>{title}</P1> : <P>{title}</P>}
      </div>

      <Button onClick={() => setEdit(true)}>Редактировать</Button>
      <Button onClick={() => deleteTask(id)}>Удалить</Button>
    </div>
  );

  const editTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="div">
        <EditInput
          type="text"
          id={id}
          value={newTitle}
          onChange={handleChange}
        />
      </div>

      <Button onClick={() => setEdit(false)}>Отменить</Button>
      <Button type="submit">Сохранить</Button>
    </form>
  );

  return edit ? editTemplate : viewTemplate;
}

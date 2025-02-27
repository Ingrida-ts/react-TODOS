import Button from "./Button/Button";
import { useState } from "react";

import { styled } from "styled-components";

const FormInput = styled.input`
  width: 400px;
  margin: 3rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

interface ItodoForm {
  addTask: (title: string) => void;
}

export default function TodoForm({ addTask }: ItodoForm) {
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(false);

  function handleTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTask(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        type="text"
        style={{
          border: "1px solid #ccc",
        }}
        onChange={handleTaskChange}
      />

      <Button onClick={() => setActive(!active)} type="submit">
        Добавить
      </Button>
    </form>
  );
}

import { useCallback } from "react";
import Button from "./Button/Button";

interface IFilterProps {
  title: string;
  setActive: (title: string) => void;
}

export default function FilterBtn({ title, setActive }: IFilterProps) {
  const handleClick = useCallback(() => {
    setActive(title);
  }, [setActive, title]);

  return (
    <Button onClick={handleClick}>
      <span>Show {title} tasks</span>
    </Button>
  );
}

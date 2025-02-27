import classes from "./Button.module.css";
import React from "react";

interface IButtonProps {
  type?: "submit";
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  setActive?: () => void;
  disabled?: boolean;
}

export default function Button({
  type,
  children,
  isActive,

  ...props
}: IButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={
        isActive ? `${classes.button} ${classes.active}` : classes.button
      }
    >
      {children}
    </button>
  );
}

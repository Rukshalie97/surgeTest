import React, { FC } from "react";
import { IButton } from "./types";
import "./style.css";

const Button: FC<IButton> = (props) => {
  const { name } = props;

  return (
    <button
      className={"btn btn-enable"}
      type="button"
      onClick={() => console.log("clicked")}
    >
      {name ? name : "Click"}
    </button>
  );
};

export default Button;

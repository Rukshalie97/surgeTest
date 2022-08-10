import React, { FC } from "react";
import { IButton } from "./types";
import "./style.css";
import { ClipLoader } from "react-spinners";

const Button: FC<IButton> = (props) => {
  const { name, onButtonClick, loading, disabled } = props;

  return (
    <>
      <button
        className={"btn btn-enable"}
        type="button"
        onClick={onButtonClick}
        disabled={disabled}
      >
        {loading ? (
          <ClipLoader color="" loading size={20} speedMultiplier={1} />
        ) : (
          name
        )}
      </button>
    </>
  );
};

export default Button;

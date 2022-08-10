import React, { FC, useCallback } from "react";
import { ITextInput } from "./types";
import "./style.css";

const TextInput: FC<ITextInput> = (props) => {
  const { name, label, onChange, inputType, value } = props;

  return (
    <>
      <label className={"label"}>{label}</label>
      <br></br>
      <input
        onChange={onChange}
        className={"input text-input"}
        type={inputType}
        name={name}
        value={value}
      />
    </>
  );
};

export default TextInput;

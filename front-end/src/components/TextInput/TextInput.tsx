import React, { FC, useCallback } from "react";
import { ITextInput } from "./types";
import "./style.css";

const TextInput: FC<ITextInput> = (props) => {
  const { name, label, onChange, inputType, value, placeholder } = props;

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
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;

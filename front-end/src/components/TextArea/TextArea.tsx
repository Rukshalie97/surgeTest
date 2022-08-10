import React from "react";
import { ITextArea } from "./types";
import "./style.css";

const TextArea: React.FC<ITextArea> = (props) => {
  const { name, label, onChange, value } = props;

  return (
    <div>
      <label className={"label"}>{label}</label>
      <br></br>
      <textarea
        name={name}
        className={"textArea"}
        onChange={onChange}
        rows={5}
        value={value}
      ></textarea>
    </div>
  );
};

export default TextArea;

import React from "react";
import { ITextArea } from "./types";
import "./style.css";

const TextArea: React.FC<ITextArea> = (props) => {
  const { name, label, onChange } = props;

  return (
    <div>
      <label className={"label"}>{label}</label>
      <br></br>
      <textarea
        name={name}
        className={"textArea"}
        onChange={onChange}
        rows={5}
      ></textarea>
    </div>
  );
};

export default TextArea;

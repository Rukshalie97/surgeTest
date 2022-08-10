import { ChangeEventHandler } from "react";

export interface ITextArea{
  name?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}

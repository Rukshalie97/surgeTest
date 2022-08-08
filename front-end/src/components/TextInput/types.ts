export interface ITextInput {
  name?: string;
  label?: string;
  inputType: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

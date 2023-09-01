import { FC, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: FC<TextInputProps> = (props) => {
  return (
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered w-full"
      {...props}
    />
  );
};

export default TextInput;

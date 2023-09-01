import { FC, Key, SelectHTMLAttributes } from "react";
interface IOption {
  label: string;
  value: Key | null | undefined;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  label?: string;
}

const SelectInput: FC<SelectProps> = ({ options, ...rest }) => {
  return (
    <select className="select select-bordered w-full" {...rest}>
      <option disabled defaultValue="">
        {rest?.label}
      </option>
      {options.map((option) => (
        <option key={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default SelectInput;

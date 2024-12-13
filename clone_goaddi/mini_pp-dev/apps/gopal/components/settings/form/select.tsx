import { twMerge } from "tailwind-merge";

import { SelectProps } from "./form.interface";
import { replaceWith } from "./form.utilities";

function Select(props: SelectProps) {
  return (
    <div className={twMerge("relative", props.className)}>
      <label htmlFor={replaceWith(props.label)}>{props.label}</label>

      <select
        name={replaceWith(props.label)}
        id={replaceWith(props.label)}
        value={props.value}
        onChange={props.onChange}
        className={twMerge(
          "block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-4",
          props.container
        )}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

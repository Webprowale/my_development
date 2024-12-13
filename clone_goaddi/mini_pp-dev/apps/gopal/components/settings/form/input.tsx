import { InputProps } from "./form.interface";
import { replaceWith } from "./form.utilities";

function Input(props: InputProps) {
  return (
    <div className={props.className}>
      <label
        htmlFor={replaceWith(props.label)}
        className="block mb-2 ml-2 text-s"
      >
        {props.label}
      </label>

      {props.register ? (
        <input
          id={replaceWith(props.label)}
          type={props.type ?? "text"}
          className="border border-gray-400 rounded-lg focus:outline-none focus:ring-0 block w-full p-4"
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          {...props.register}
        />
      ) : (
        <input
          type={props.type ?? "text"}
          id={replaceWith(props.label)}
          name={props.name}
          className="border border-gray-400 rounded-lg focus:outline-none focus:ring-0 block w-full p-4"
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          required={props.required}
          onChange={props.onChange}
          value={props.value}
        />
      )}
    </div>
  );
}

export default Input;

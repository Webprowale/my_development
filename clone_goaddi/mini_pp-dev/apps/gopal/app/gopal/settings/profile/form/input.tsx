import { InputProps } from "./form.interface";
import { replaceWith } from "./form.utilities";

function CustomInput(props: InputProps) {
  return (
    <div className={props.className}>
      <label
        htmlFor={replaceWith(props.label)}
        className="block -mt-1 font-normal text-left text-sm"
      >
        {props.label}
      </label>

      {props.register ? (
        <input
          id={replaceWith(props.label)}
          type={props.type ?? "text"}
          className="border-2 border-gray-200"
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          {...props.register}
        />
      ) : (
        <input
          type={props.type ?? "text"}
          id={replaceWith(props.label)}
          name={props.name}
          className="border-2 border-gray-200 mt-2 p-1.5 rounded-md"
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          required={props.required}
          onChange={props.onChange}
          value={props.value}
        />
      )}
    </div>
  );
}

export default CustomInput;

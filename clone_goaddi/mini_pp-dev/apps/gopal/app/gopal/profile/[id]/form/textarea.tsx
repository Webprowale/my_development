import { TextAreaProps } from "./form.interface";
import { replaceWith } from "./form.utilities";

function TextArea(props: TextAreaProps) {
  return (
    <div className={props.className}>
      <label htmlFor={replaceWith(props.label)} className="block mb-2">
        {props.label}
      </label>
      {
        props?.register?
      
        <textarea
        id={replaceWith(props.label)}
        rows={props.rows ?? 4}
        className="block p-3 w-full rounded-lg border border-gray-300 focus:outline-none"
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        {...props.register}
      
        
      />:
      <textarea
      id={replaceWith(props.label)}
      rows={props.rows ?? 4}
      className="block p-3 w-full rounded-lg border border-gray-300 focus:outline-none"
      placeholder={props.placeholder ?? `Enter ${props.label}`}
      required={props.required}
      onChange={props.onChange}
      value={props.value}
    />
      }

    </div>
  );
}

export default TextArea;

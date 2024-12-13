interface SelectProps {
  value?: string;
  content: string[];
  className?: string;
  label: string;
}

function FeedbackSelect({ value, className, content, label }: SelectProps) {
  return (
    <section className="flex flex-col w-[100%] gap-[4px]">
      <label
        className="font-[400] text-sm leading-[24px]"
        htmlFor={label}
      >
        {label}
      </label>
      <select className={className}>
        {content.map((text: string) => {
          return (
            <option
              className=""
              value={value}
            >
              {text}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default FeedbackSelect;

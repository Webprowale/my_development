import ClipLoader from "react-spinners/ClipLoader";

const Button = ({
  text,
  className,
  onClick,
  isSelected,
  disabled,
  isLoading = false,
}: {
  text: string;
  className: string;
  onClick: any;
  isSelected?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="w-full">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`border-0 w-full ${className} text-xs rounded text-center font-bold py-2 text-semibold transaction cursor-pointer flex items-center justify-center`}
      >
        {isLoading ? (
          <ClipLoader
            color="#ffff"
            size={20}
            loading={isLoading}
          />
        ) : (
          <span>{text}</span>
        )}
      </button>
    </div>
  );
};

export default Button;

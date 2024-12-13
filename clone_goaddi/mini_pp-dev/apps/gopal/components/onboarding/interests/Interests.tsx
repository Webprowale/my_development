import { SwimmingPool } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { IInterests } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface Props extends IInterests {
  onChange: (label: string, isChecked: boolean) => void;
}

const Interests: React.FC<Props> = ({ label, id, icon, name, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onChange(label, isChecked);
  };
  return (
    <div className="interest w-full min-h-[120px] relative">
      <input
        type="checkbox"
        id={id}
        onChange={handleCheckboxChange}
        className="absolute right-3 top-3  w-[16px] h-[16px] rounded-full border-[#E4E7EC]"
      />
      <label
        htmlFor={id}
        className="flex flex-col h-full border border-[#E4E7EC] p-2 rounded justify-between"
      >
        {icon ? (
          icon
        ) : (
          <SwimmingPool
            size={25}
            weight="bold"
            className="interest-icon text-[#344054]"
          />
        )}
        <span className="text-sm text-[#344054]">{label}</span>
      </label>
    </div>
  );
};

export default Interests;

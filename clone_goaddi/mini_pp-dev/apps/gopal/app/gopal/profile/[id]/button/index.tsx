import { twMerge } from "tailwind-merge";

import { SpinnerIcon } from "../icons/spinner";
import { baseClassName, sizeClasses } from "./button.constant";
import { ButtonProps } from "./button.interface";
import { getVariantClasses } from "./button.utilities";

export function C_Button<T extends React.ElementType = "button">(
  props: ButtonProps<T>
) {
  const isIcon = props.isLoading ? <SpinnerIcon /> : props.icon;
  const disabled = props.isLoading || props.disabled;

  const { variant = "solid", colorScheme = "primary", size = "sm" } = props;

  const className = twMerge(
    baseClassName,
    (props.href || props.to) && "w-fit",
    disabled == false && "active:scale-90",
    sizeClasses[size],
    getVariantClasses(variant, colorScheme),
    props.className
  );

  if (props.as) {
    const Element = props.as as React.ElementType;
    return (
      <Element {...props} className={className}>
        {props.children}
      </Element>
    );
  }

  return (
    <button {...props} disabled={disabled} className={className}>
      {isIcon && props.iconpos === "left" && (
        <span className="mr-2">{isIcon}</span>
      )}
      <span>{props.children ?? ""}</span>
      {isIcon && props.iconpos === "right" && (
        <span className="ml-2">{isIcon}</span>
      )}
    </button>
  );
}

C_Button.defaultProps = {
  iconpos: "left",
  disabled: false,
  colorScheme: "primary",
};

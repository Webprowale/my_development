import { cn } from "@/lib/utils";

import {
  colorSchemeOutlineClasses,
  colorSchemeSolidClasses,
} from "./button.constant";
import { ColorScheme, Variant } from "./button.interface";

export function getVariantClasses(variant: Variant, colorScheme: ColorScheme) {
  switch (variant) {
    case "outline":
      return cn(
        colorSchemeOutlineClasses[colorScheme],
        "border bg-transparent",
      );
    case "ghost":
      return cn(colorSchemeOutlineClasses[colorScheme], "bg-transparent p-0");
    case "link":
      return cn(
        colorSchemeOutlineClasses[colorScheme],
        "border-b-2 p-0 rounded-none",
      );
    default:
      return cn(
        colorSchemeSolidClasses[colorScheme],
        "text-white hover:bg-opacity-80",
      );
  }
}

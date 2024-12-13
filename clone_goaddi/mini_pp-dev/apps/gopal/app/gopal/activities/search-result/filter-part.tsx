import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Filter from "../components/filter";
import Activities from "./activities";

function FilterPart() {
  return (
    <AccordionItem value="item-1" className="px-4 py-2">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  );
}

export default FilterPart;

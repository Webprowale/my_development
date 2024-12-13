import { CiSliderHorizontal } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FilterPart from "../search-result/filter-part";

function Filter() {
  return (
    <>
      <div className="bg-white w-full p-4">
        <div className="flex justify-between">
          <span className="flex items-center gap-2 font-semibold">
            <CiSliderHorizontal
              className="font-semibold text-black"
              size={20}
            />{" "}
            Filter your result
          </span>

          <span className="text-blue-500 font-medium">Clear</span>
        </div>
      </div>

      <Accordion type="multiple" className="w-full bg-white mt-[1px] ">
        <FilterPart />
      </Accordion>
    </>
  );
}

export default Filter;

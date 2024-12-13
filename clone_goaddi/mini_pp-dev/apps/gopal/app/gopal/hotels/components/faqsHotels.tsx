import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionLayout from "../../activities/components/section";

type Prop = {
  isDetail?: boolean;
};
function FAQs({ isDetail = true }: Prop) {
  return (
    <SectionLayout
      title="FAQs"
      description={`
      ${isDetail ? "Questions travelers like you have asked, answered! ❓" : ""}
      `}
    >
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        {[...new Array(6)].map((key, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-[1px] p-2 my-4 rounded"
          >
            <AccordionTrigger className="no-underline">
              How far in advance should I book my flight?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-100 p-2">
              It's generally recommended to book flights as early as possible to
              secure the best fares, especially during peak travel seasons.
              However, last-minute deals may also be available for flexible
              travelers.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionLayout>
  );
}

export default FAQs;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionLayout from "./section";

function FAQs() {
  return (
    <SectionLayout
      title="FAQs"
      description="Questions travelers like you have asked, answered! ❓"
    >
      <Accordion type="single" collapsible className="w-full">
        {[...new Array(1)].map((key, index) => (
          <AccordionItem
            value={`item-${index}`}
            className="border-[1px] p-2 my-4 rounded"
          >
            <AccordionTrigger className="no-underline">
              What is the difference between a direct flight and a connecting
              flight?
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

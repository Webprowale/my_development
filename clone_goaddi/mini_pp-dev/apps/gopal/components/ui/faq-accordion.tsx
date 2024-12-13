
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionLayout from "@/components/ui/section-layout"


export interface IFaq
{
      triggerLabel: string;
      content: string;
}


function FaqAccordion({ faqList }: {faqList: IFaq[]})
{

      return (
            <SectionLayout title="FAQs" description="Questions travelers like you have asked, answered! ❓">

                  <Accordion type="single" collapsible className="w-full">

                        {faqList.map((item, index) => (
                              <AccordionItem value={`item-${index}`} className="border-[1px] p-2 my-4 rounded">
                                    <AccordionTrigger className="no-underline">{item.triggerLabel}</AccordionTrigger>
                                    <AccordionContent className="p-2 bg-gray-100">
                                          {item.content}
                                    </AccordionContent>
                              </AccordionItem>
                        ))}

                  </Accordion>

            </SectionLayout>
      );

}


export default FaqAccordion; 
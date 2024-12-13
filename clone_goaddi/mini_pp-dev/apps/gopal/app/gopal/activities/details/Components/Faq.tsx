import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {

  const faqs = [
    {
      question: 'Does Rivieria Resort Lekki have bars on the premises?',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    {
      question: 'Does Riviera offer airport transfer?;',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    {
      question: 'What types of entertainment are available at Riviera Hotel?',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    {
      question: 'Does Rivieria Resort Lekki have bars on the premises?',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    {
      question: 'Does Riviera offer airport transfer?;',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    {
      question: 'What types of entertainment are available at Riviera Hotel?',
      answer: 'Enjoy your holiday retreat the greatest way possible with Riviera bar and poolside bar accessible right in front of your doorstep for whenever you need a sip or two.',
    },
    
    
  ];
  
  return (
    <div  className="container-fluid p-6">
        <h1 className="text-2xl font-bold mb-4">FAQs</h1>

      <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            className="border-[1px] p-2 my-4 rounded"
          >
            <AccordionTrigger className="no-underline">
            {faq.question}
            </AccordionTrigger>
            <AccordionContent className="bg-gray-100 p-3">
            {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
    </div>
  );
}

export default Faq;

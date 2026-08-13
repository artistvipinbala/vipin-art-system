import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/funnel";

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="text-mal text-left text-base font-semibold">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-mal text-sm text-muted-foreground sm:text-base">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

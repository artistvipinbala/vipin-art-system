import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { purchaseFaqs } from "@/content/funnel";

export function PurchaseFaq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {purchaseFaqs.map((item, i) => (
        <AccordionItem key={item.q} value={`pq-${i}`}>
          <AccordionTrigger className="text-mal text-left text-sm font-semibold sm:text-base">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-mal text-sm text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Placeholder } from "./Placeholder";

/**
 * Checkout placeholder. Owner: connect the real payment gateway here later.
 */
export function PaymentModal({
  open,
  onOpenChange,
  planName,
  price,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-mal text-lg">{planName}</DialogTitle>
          <DialogDescription>
            {price} — checkout is not connected yet.
          </DialogDescription>
        </DialogHeader>
        <Placeholder label="[PAYMENT GATEWAY PLACEHOLDER]" ratio="aspect-[3/2]" />
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Check, CreditCard } from "lucide-react";
import { UserCreditsService } from "@/services/UserCreditsService";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
}

interface PurchaseCreditsModalProps {
  onCreditsUpdated: () => void;
  trigger?: React.ReactNode;
}

const creditPackages: CreditPackage[] = [
  {
    id: "basic",
    name: "Basic",
    credits: 10,
    price: 4.99,
  },
  {
    id: "standard",
    name: "Standard",
    credits: 25,
    price: 9.99,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    credits: 50,
    price: 17.99,
  },
  {
    id: "pro",
    name: "Professional",
    credits: 100,
    price: 29.99,
  },
];

export function PurchaseCreditsModal({
  onCreditsUpdated,
  trigger,
}: PurchaseCreditsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      // Get the selected package
      const pkg = creditPackages.find((p) => p.id === selectedPackage);
      if (!pkg) throw new Error("Invalid package selected");

      // In a real implementation, this would integrate with a payment processor
      // For demo purposes, we'll just add the credits directly
      await UserCreditsService.addSignalCredits(pkg.credits);

      toast({
        title: "Purchase successful",
        description: `You have successfully purchased ${pkg.credits} signal credits.`,
      });

      // Notify parent component to refresh credits
      onCreditsUpdated();

      // Close the modal
      setIsOpen(false);
    } catch (error) {
      console.error("Error purchasing credits:", error);
      toast({
        title: "Purchase failed",
        description:
          "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Purchase Credits</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Coins className="h-5 w-5 mr-2 text-yellow-500" />
            Purchase Signal Credits
          </DialogTitle>
          <DialogDescription>
            Select a credit package to continue receiving trading signals.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-4 cursor-pointer transition-all ${selectedPackage === pkg.id ? "ring-2 ring-primary" : "hover:bg-accent/50"} ${pkg.popular ? "relative overflow-hidden" : ""}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-bl-md">
                  Popular
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{pkg.name}</h3>
                  <div className="flex items-center mt-1">
                    <Coins className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="text-lg font-bold">{pkg.credits}</span>
                    <span className="text-sm ml-1">credits</span>
                  </div>
                </div>
                {selectedPackage === pkg.id && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <Separator className="my-2" />
              <div className="text-right">
                <span className="text-lg font-bold">
                  ${pkg.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground block">
                  ${(pkg.price / pkg.credits).toFixed(2)} per credit
                </span>
              </div>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="w-full sm:w-auto"
          >
            {isPurchasing ? (
              <>
                <LoadingSpinner className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Complete Purchase
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

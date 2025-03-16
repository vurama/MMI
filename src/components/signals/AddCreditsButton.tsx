import React from "react";
import { Button } from "@/components/ui/button";
import { UserCreditsService } from "@/services/UserCreditsService";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";

interface AddCreditsButtonProps {
  onCreditsAdded: () => void;
  amount?: number;
}

export function AddCreditsButton({
  onCreditsAdded,
  amount = 10,
}: AddCreditsButtonProps) {
  const { toast } = useToast();

  const handleAddCredits = async () => {
    try {
      await UserCreditsService.addSignalCredits(amount);
      toast({
        title: "Credits Added",
        description: `${amount} credits have been added to your account.`,
      });
      // Make sure to refresh the credits display
      if (onCreditsAdded) {
        onCreditsAdded();
      }
    } catch (error) {
      console.error("Error adding credits:", error);
      toast({
        title: "Error",
        description: "Failed to add credits. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddCredits}
      className="flex items-center"
    >
      <PlusCircle className="h-3.5 w-3.5 mr-1" />
      <span>Add {amount} Credits</span>
    </Button>
  );
}

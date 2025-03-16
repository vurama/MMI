import React, { useEffect } from "react";
import SignalsPage from "@/components/signals/SignalsPage";
import { useToast } from "@/components/ui/use-toast";

export default function SignalRequestDemo() {
  const { toast } = useToast();

  useEffect(() => {
    // Show a toast with instructions when the demo loads
    toast({
      title: "Signal Request Demo",
      description:
        "Try requesting signals with different options. Regular requests take 1 minute, quick requests take 15 seconds.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <SignalsPage />
    </div>
  );
}

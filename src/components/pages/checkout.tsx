import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Shield,
} from "lucide-react";
import AnimatedGradientBackground from "../ui/animated-gradient-background";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Parse query parameters to get plan and billing period
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("plan") || "pro";
  const billingPeriod = queryParams.get("billing") || "monthly";

  // Plan details based on planId
  const planDetails = {
    basic: {
      name: "Basic",
      price: 0,
      features: [
        "Stock market tracking",
        "Basic AI insights",
        "Daily market updates",
      ],
    },
    pro: {
      name: "Pro",
      price: 29.99,
      features: [
        "All Basic features",
        "Real-time news validation",
        "Custom alerts",
        "Advanced AI insights",
        "Cryptocurrency analysis",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: 99.99,
      features: [
        "All Pro features",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
    },
  };

  const selectedPlan = planDetails[planId] || planDetails.pro;
  const price = selectedPlan.price;
  const yearlyPrice = price * 12 * 0.8; // 20% discount for yearly
  const finalPrice = billingPeriod === "yearly" ? yearlyPrice : price;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})?(\d{0,2})?/, (_, p1, p2) => {
          if (p1) return `${p1}${p2 ? "/" + p2 : ""}`;
          return value;
        });
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPlan.name} plan.`,
        duration: 5000,
      });
      navigate("/success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 dark:from-gray-900 dark:to-indigo-950">
      <AnimatedGradientBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        <div className="md:col-span-3">
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Secure Checkout
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold mt-4 dark:text-white">
                Complete Your Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Payment Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Smith"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19}
                          required
                          className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={3}
                          required
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center mb-4">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Your payment information is encrypted and secure
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-lg font-medium dark:bg-blue-700 dark:hover:bg-blue-800"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" />
                          Processing...
                        </>
                      ) : (
                        `Pay ${finalPrice.toFixed(2)} ${billingPeriod === "yearly" ? "/year" : "/month"}`
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg sticky top-6 dark:bg-gray-800/90 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold dark:text-white">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {selectedPlan.name} Plan
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {billingPeriod === "yearly"
                        ? "Annual billing"
                        : "Monthly billing"}
                    </p>
                    {billingPeriod === "yearly" && (
                      <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Save 20%
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${finalPrice.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {billingPeriod === "yearly" ? "per year" : "per month"}
                    </p>
                  </div>
                </div>

                <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 dark:text-gray-100">
                    Included Features:
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4 bg-gray-100 dark:bg-gray-700" />

                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl text-gray-900 dark:text-white">
                    ${finalPrice.toFixed(2)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {billingPeriod === "yearly" ? "/year" : "/month"}
                    </span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  By completing this purchase, you agree to our Terms of Service
                  and Privacy Policy. You can cancel your subscription at any
                  time.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;

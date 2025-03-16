import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketSentimentMeter from "./MarketSentimentMeter";
import { useMarketSentiment } from "@/hooks/useMarketSentiment";
import { X } from "lucide-react";

interface FloatingSentimentMeterProps {
  onClose?: () => void;
  className?: string;
}

const FloatingSentimentMeter: React.FC<FloatingSentimentMeterProps> = ({
  onClose,
  className,
}) => {
  const { overallScore, historicalData } = useMarketSentiment();
  const [isVisible, setIsVisible] = useState(false);

  // Calculate trend from historical data
  const trend =
    historicalData && historicalData.length > 1
      ? overallScore - historicalData[1].sentiment_score
      : 0;

  useEffect(() => {
    const handleToggle = () => setIsVisible((prev) => !prev);
    window.addEventListener("toggle-sentiment-meter", handleToggle);
    return () =>
      window.removeEventListener("toggle-sentiment-meter", handleToggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-20 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50 ${className}`}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex flex-col items-center">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Market Sentiment
            </div>
            <MarketSentimentMeter
              score={overallScore}
              trend={trend}
              size="sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSentimentMeter;

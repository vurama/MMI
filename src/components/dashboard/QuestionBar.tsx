import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionBarProps {
  onAsk?: (question: string) => void;
  remainingQuestions?: number;
  maxQuestions?: number;
}

const QuestionBar: React.FC<QuestionBarProps> = ({
  onAsk = () => {},
  remainingQuestions = 25,
  maxQuestions = 25,
}) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading || remainingQuestions <= 0) return;

    setIsLoading(true);
    onAsk(question);

    // Add to recent questions
    setRecentQuestions((prev) => [question, ...prev.slice(0, 4)]);

    // Simulate response time
    setTimeout(() => {
      setIsLoading(false);
      setQuestion("");
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion);
    setIsExpanded(false);
  };

  const suggestions = [
    "What's the current market sentiment for tech stocks?",
    "Should I invest in real estate right now?",
    "Analyze Bitcoin's price movement for the next week",
    "What sectors are showing growth potential?",
    "How will recent Fed decisions impact the market?",
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center px-4 py-2">
          <div className="flex-shrink-0 mr-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900/50">
              <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about market trends, investment advice, or specific assets..."
            className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-2 dark:bg-gray-800 dark:text-gray-100"
            onFocus={() => setIsExpanded(true)}
          />

          <div className="flex items-center gap-2 ml-2">
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200 hidden sm:flex dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {remainingQuestions}/{maxQuestions} questions
            </Badge>

            <Button
              type="submit"
              size="icon"
              className={`rounded-full ${isLoading || remainingQuestions <= 0 ? "bg-gray-300 dark:bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"}`}
              disabled={
                isLoading || remainingQuestions <= 0 || !question.trim()
              }
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-100 px-4 py-2 bg-gray-50 dark:bg-gray-800/80 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Suggested questions
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start h-auto py-1.5 px-2 text-xs text-left text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>

              {recentQuestions.length > 0 && (
                <>
                  <div className="text-xs font-medium text-gray-500 mt-3 mb-2 dark:text-gray-400">
                    Recent questions
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recentQuestions.map((q, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="justify-start h-auto py-1.5 px-2 text-xs text-left text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
                        onClick={() => handleSuggestionClick(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default QuestionBar;

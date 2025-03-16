import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Video,
  FileText,
  Mail,
  ExternalLink,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      question: "How do I interpret the Market Sentiment Score?",
      answer:
        "The Market Sentiment Score is a numerical representation of overall market sentiment on a scale from 0 to 100. Scores above 70 indicate bullish sentiment, while scores below 30 suggest bearish sentiment. The score is calculated using our proprietary AI algorithm that analyzes market data, news, and social media trends.",
    },
    {
      question: "How can I customize my dashboard widgets?",
      answer:
        "To customize your dashboard, click on the 'Customize' button in the top-right corner of the dashboard. From there, you can add, remove, or rearrange widgets by dragging and dropping them. Each widget also has its own settings that can be accessed by clicking the gear icon in the widget's header.",
    },
    {
      question: "What AI agents are available and what do they do?",
      answer:
        "Our platform offers four AI agents: Market Analyzer (detects market trends), Sentiment Tracker (analyzes market sentiment), News Analyzer (parses news content for relevant information), and Alert Generator (creates notifications based on market conditions). You can enable or disable these agents in the Settings panel.",
    },
    {
      question: "How do I set up custom alerts?",
      answer:
        "To set up custom alerts, navigate to the Alerts section from the sidebar. Click on 'Create New Alert,' select the market or asset you want to track, set your threshold conditions, choose your preferred notification method (email, SMS, or in-app), and save your configuration.",
    },
    {
      question: "What subscription plans are available?",
      answer:
        "We offer three subscription tiers: Basic (free with limited features), Pro ($19.99/month with advanced analytics and all AI agents), and Enterprise (custom pricing with additional features like API access and dedicated support). You can view and manage your subscription from the Subscription section in the sidebar.",
    },
  ];

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqItems;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold flex items-center dark:text-white">
          <HelpCircle className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Help Center
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Find answers to your questions and learn how to use our platform
        </p>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for help..."
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="flex-1">
        <TabsList className="px-6 pt-4 space-x-2 border-b border-gray-200 dark:border-gray-800 w-full">
          <TabsTrigger
            value="faq"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/30 dark:data-[state=active]:text-indigo-400"
          >
            Frequently Asked Questions
          </TabsTrigger>
          <TabsTrigger
            value="quick-help"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/30 dark:data-[state=active]:text-indigo-400"
          >
            Quick Help
          </TabsTrigger>
          <TabsTrigger
            value="guides"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-900/30 dark:data-[state=active]:text-indigo-400"
          >
            Getting Started
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-6 py-4">
          <TabsContent value="faq" className="mt-0">
            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="border-gray-200 dark:border-gray-700"
                    >
                      <AccordionTrigger className="text-sm font-medium dark:text-white hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No results found for "{searchQuery}"
                    </p>
                    <Button variant="link" onClick={() => setSearchQuery("")}>
                      Clear search
                    </Button>
                  </div>
                )}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="quick-help" className="mt-0">
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-3 dark:text-white">
                Quick Help
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-1">
                      <BookOpen className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium dark:text-white">
                        Documentation
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Browse our detailed guides
                    </span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-1">
                      <Video className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium dark:text-white">
                        Video Tutorials
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Learn with step-by-step videos
                    </span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-1">
                      <MessageSquare className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium dark:text-white">
                        Live Chat
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Chat with our support team
                    </span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("mailto:support@example.com")}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-1">
                      <Mail className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium dark:text-white">
                        Email Support
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Get help via email
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="mt-0">
            <div className="space-y-6">
              <h2 className="text-lg font-medium mb-3 dark:text-white">
                Getting Started
              </h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="dark:text-white">Platform Overview</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="dark:text-white">
                      Understanding Market Sentiment
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="dark:text-white">
                      Setting Up Your First Alert
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="dark:text-white">
                      Customizing Your Dashboard
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default HelpCenter;

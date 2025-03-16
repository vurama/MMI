import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LineChart, Brain } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGradientBackground from "../ui/animated-gradient-background";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <AnimatedGradientBackground />

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="font-semibold text-xl flex items-center">
              <LineChart className="h-6 w-6 mr-2 text-blue-600" />
              <span>MarketMind AI</span>
            </Link>
          </motion.div>
          <motion.nav
            className="hidden md:flex items-center space-x-7 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="hover:text-blue-600">
              Features
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Markets
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Resources
            </Link>
          </motion.nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="max-w-md w-full px-4 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.3,
                }}
                className="bg-blue-50 p-3 rounded-full inline-flex items-center justify-center"
              >
                <Brain className="h-8 w-8 text-blue-600" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight">
              MarketMind AI
            </h2>
            <p className="text-xl font-medium text-gray-500 mt-2">
              AI-powered market intelligence for smarter investment decisions
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { CheckCircle, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="bg-blue-50 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-blue-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mb-6"
        >
          <LineChart className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-semibold text-xl">MarketMind AI</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Subscription Activated!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Thank you for subscribing to MarketMind AI. You now have access to all
          our AI-powered market intelligence features.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md w-full"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

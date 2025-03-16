import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Error creating account");
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" },
  };

  const staggerDelay = 0.1;

  return (
    <AuthLayout>
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 1, duration: 0.4 }}
          >
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 2, duration: 0.4 }}
          >
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 3, duration: 0.4 }}
          >
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </motion.div>
            <motion.p
              className="text-xs text-gray-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: staggerDelay * 3.5, duration: 0.4 }}
            >
              Password must be at least 8 characters
            </motion.p>
          </motion.div>
          {error && (
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 4, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-md transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </motion.div>

          <motion.div
            className="text-xs text-center text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: staggerDelay * 5, duration: 0.4 }}
          >
            By creating an account, you agree to our{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </motion.div>

          <motion.div
            className="text-sm text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: staggerDelay * 6, duration: 0.4 }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </AuthLayout>
  );
}

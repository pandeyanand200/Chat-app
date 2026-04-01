import { useState } from "react";
import { useAuthStore } from "../lib/useAuthStore";
import { Mail, Lock, User, Eye, EyeOff, Loader, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { login, signup, isLoggingIn, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(formData);
    } else {
      login({ email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-black/40 backdrop-blur-3xl">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="size-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <MessageSquare className="size-6 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-100">{isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-gray-400 mt-2">{isSignup ? "Join our community today" : "Sign in to continue chatting"}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 px-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-2.5 pl-10 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-2.5 pl-10 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 px-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-2.5 pl-10 pr-12 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || isSigningUp}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(isLoggingIn || isSigningUp) ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                isSignup ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 font-semibold hover:underline"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Features/Art */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full scale-150 animate-pulse" />
        <div className="relative z-10 max-w-lg text-center space-y-6">
           <div className="grid grid-cols-3 gap-4 mb-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-2xl bg-gray-800/50 border border-gray-700/50 ${i % 2 === 0 ? 'animate-pulse' : ''}`} />
              ))}
           </div>
           <h2 className="text-3xl font-bold text-gray-100">Join our global network</h2>
           <p className="text-lg text-gray-400">Experience real-time communication like never before with smooth animations and secure messaging.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, User, CheckCircle, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowModal(false);

    try {
      if (isSignUp) {
        const result = await signUp(email, password);
        if (result?.error) throw result.error;
        setShowModal(true);
      } else {
        await signIn(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      const message = error.message || (error.toString().includes('auth') ? 'Invalid email or password.' : 'An unexpected error occurred.');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsSignUp(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="relative max-w-md w-full bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 sm:p-10 transition-all duration-500">
        {/* Cross Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full border border-gray-600 shadow-lg transition-all duration-200 z-10"
          aria-label="Close"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 shadow-xl">
              <BarChart3 className="h-8 w-8 text-gray-900" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-100">
            {isSignUp ? 'Join DevScore' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignUp
              ? 'Start analyzing your developer profile instantly'
              : 'Sign in to access your reports and dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm shadow-inner">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500 transition-colors text-base"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input with Eye Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500 transition-colors text-base"
                placeholder="Minimum 6 characters"
                minLength={6}
              />
              {/* Eye Toggle Button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePasswordVisibility();
                  }
                }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-teal-400 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-teal-400 transition-colors" />
                )}
              </button>
            </div>
            {/* Password visibility hint */}
            <div className="mt-1 text-xs text-gray-500 flex items-center">
              {showPassword ? (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Password is visible
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Click eye icon to show password
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center text-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-r-2 border-gray-900"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <User className="mr-2 h-5 w-5" />
                {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        {/* Toggle Auth Mode Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setShowModal(false);
              // Reset password visibility when switching modes
              setShowPassword(false);
            }}
            className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="relative bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm text-center border border-gray-700">
            <button
              onClick={handleModalClose}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full border border-gray-600 shadow-lg transition-all duration-200"
              aria-label="Close modal"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <CheckCircle className="h-10 w-10 mx-auto text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-3">Verification Required</h3>
            <p className="text-gray-300">
              A confirmation email has been sent to **{email}**. Please verify your email before signing in.
            </p>
            <button
              onClick={handleModalClose}
              className="mt-6 w-full px-4 py-2 bg-teal-500 text-gray-900 rounded-lg font-semibold hover:bg-teal-600 transition"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
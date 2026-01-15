import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, User, CheckCircle, X } from 'lucide-react'; // Added X for cross button
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { user, signUp, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowModal(false);

    try {
      if (isSignUp) {
        // Call signUp without destructuring
        const result = await signUp(email, password, '');
        // If your signUp returns an error object, handle it
        if (result?.error) throw result.error;

        // Show modal popup
        setShowModal(true);
      } else {
        await signIn(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      // Improved error message extraction
      const message = error.message || (error.toString().includes('auth') ? 'Invalid email or password.' : 'An unexpected error occurred.');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle close button click
  const handleClose = () => {
    navigate('/'); // Navigate to home page
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setIsSignUp(false);
  };

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    // 1. Sleek Background (Dark Mode Aesthetic)
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8 md:py-16">

      {/* 2. Modern Card Container with Close Button */}
      <div className="relative max-w-md w-full bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 sm:p-10 transition-all duration-500">

        {/* 🔴 NEW: Cross Button - Top Right Corner */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full border border-gray-600 shadow-lg transition-all duration-200 z-10"
          aria-label="Close"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-8">
          {/* Logo with Tech Gradient */}
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 shadow-xl">
              <BarChart3 className="h-8 w-8 text-gray-900" />
            </div>
          </div>

          {/* Professional Headings */}
          <h2 className="text-3xl font-bold text-gray-100">
            {isSignUp ? 'Join DevScore' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignUp
              ? 'Start analyzing your developer profile instantly'
              : 'Sign in to access your reports and dashboard'}
          </p>
        </div>

        {/* Error Notification (Better Styling) */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm shadow-inner">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Form */}
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
                // 3. Modern Input Style
                className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500 transition-colors text-base"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500 transition-colors text-base"
                placeholder="Minimum 6 characters"
                minLength={6}
              />
            </div>
          </div>

          {/* Submit Button (Tech Gradient) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center text-lg"
          >
            {loading ? (
              // Enhanced Loading Spinner
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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-gray-100 py-3 rounded-lg border border-gray-600 transition"
        >
          {/* Google Icon SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.719-1.617-3.945-2.617-6.656-2.617-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.633z" fill="#FFC107" />
              <path d="M3.152 7.345l3.281 2.406c.891-1.719 2.578-2.812 4.617-2.812 1.172 0 2.273.406 3.125 1.203l2.672-2.602c-1.719-1.617-3.945-2.617-6.656-2.617-3.984 0-7.367 2.344-8.844 5.75z" fill="#FF3D00" />
              <path d="M12.05 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.883.633-2.086 1.078-3.516 1.078-2.953 0-5.453-1.992-6.352-4.672l-3.242 2.5c1.461 3.406 4.844 5.992 9.594 5.992z" fill="#4CAF50" />
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-.547.07-1.078.172-1.578l-3.281-2.406c-.422.844-.672 1.797-.672 2.984 0 5.523 4.477 10 10 10 5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.633z" fill="#1976D2" />
            </g>
          </svg>
          Continue with Google
        </button>

        {/* Toggle Auth Mode Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setShowModal(false);
            }}
            className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      {/* Modal popup for signup confirmation (Sleek Styling) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="relative bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm text-center border border-gray-700">

            {/* 🔴 NEW: Modal Close Button */}
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
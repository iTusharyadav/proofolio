import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowModal(false);

    try {
      if (isSignUp) {
        await signUp(email, password, username);
        setShowModal(true);
      } else {
        await signIn(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 sm:p-10">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300">
              <BarChart3 className="h-8 w-8 text-gray-900" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-100">
            {isSignUp ? 'Join DevScore' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignUp
              ? 'Create your account to get started'
              : 'Sign in to access your dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="your_username"
                  minLength={3}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setUsername('');
              setError('');
            }}
            className="text-sm text-teal-400 hover:text-teal-300"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-gray-800 p-8 rounded-xl text-center max-w-sm border border-gray-700">
            <CheckCircle className="h-10 w-10 mx-auto text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-3">
              Verify Your Email
            </h3>
            <p className="text-gray-300">
              A confirmation email was sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                setIsSignUp(false);
              }}
              className="mt-6 w-full py-2 bg-teal-500 text-gray-900 rounded-lg font-semibold"
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

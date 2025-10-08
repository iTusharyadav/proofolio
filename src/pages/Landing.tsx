import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Github, Linkedin, FileText, Code, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Landing: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <BarChart3 className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Developer
            <span className="text-blue-600 block">Score Awaits</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a comprehensive analysis of your developer profile across GitHub, LinkedIn, 
            your blog, and coding platforms. Discover your strengths and areas for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Get Your Score
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/auth"
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-gray-400 transition-colors"
                >
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analyze Your Developer Presence
            </h2>
            <p className="text-lg text-gray-600">
              We evaluate your presence across multiple platforms to give you a comprehensive score
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-gray-900 text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Github className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub Activity</h3>
              <p className="text-gray-600">
                Repository count, stars earned, commit frequency, and code quality metrics
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Linkedin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn Network</h3>
              <p className="text-gray-600">
                Professional network strength, activity level, and industry connections
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Blog</h3>
              <p className="text-gray-600">
                Post frequency, content quality, audience engagement, and technical depth
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coding Platforms</h3>
              <p className="text-gray-600">
                Problem-solving skills, contest performance, and algorithmic thinking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">4.9</span>
              </div>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">10K+</span>
              </div>
              <p className="text-blue-100">Developers Analyzed</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">85%</span>
              </div>
              <p className="text-blue-100">Improved Their Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Discover Your Developer Score?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers who've improved their profiles with our detailed analysis
          </p>
          {!user && (
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
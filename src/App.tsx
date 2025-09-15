import React, { useState } from 'react';
import { JobDescription } from './components/JobDescription';
import { ApplicationForm } from './components/ApplicationForm';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if current path is admin
  const isAdminPath = window.location.pathname === '/admin' || window.location.hash === '#admin';

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.hash = '';
  };

  // Admin routes
  if (isAdminPath) {
    if (!isLoggedIn) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Public career page
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/image.png" 
                alt="Haryak Technologies India Private Limited" 
                className="h-12 md:h-16 object-contain"
              />
            </div>
            <div className="text-right">
              <a 
                href="https://haryak.com/careers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <h1 className="text-xl md:text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                  Careers
                </h1>
                <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors duration-200">
                  Join Our Team
                </p>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Description */}
          <div>
            <JobDescription />
          </div>

          {/* Application Form */}
          <div>
            <ApplicationForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="mb-4">
              <a 
                href="https://www.haryak.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-semibold"
              >
                Haryak Technologies India Private Limited
              </a>
            </div>
            <p className="text-gray-300">
              © 2025 Haryak Technologies India Private Limited. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Empowering Tomorrow's Solutions, Today
            </p>
            <div className="mt-4">
              <a 
                href="#admin" 
                className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
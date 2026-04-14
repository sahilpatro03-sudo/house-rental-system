import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-2 tracking-tight">
          <div className="bg-indigo-600 p-1.5 rounded-xl text-white">
            <Home size={24} />
          </div>
          <span className="hidden sm:inline">LuxeRent</span>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
            Browse
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {(user?.role === 'landlord' || user?.role === 'admin') && (
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
              )}
              
              <div className="flex items-center gap-3 bg-white/50 border border-slate-200/50 pl-3 pr-1.5 py-1.5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 p-1 rounded-lg text-indigo-600">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{user?.username}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

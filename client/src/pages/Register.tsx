import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, Briefcase, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'tenant'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/50 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/40 blur-[100px] rounded-full"></div>

      <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-indigo-100/50 w-full max-w-lg border border-white/50 relative z-10">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 -rotate-6">
            <UserPlus className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Join LuxeRent</h2>
          <p className="text-slate-500 font-semibold mt-3 flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-indigo-400" /> Start your luxury journey
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-5 rounded-3xl mb-8 flex items-center gap-4">
            <div className="bg-rose-100 p-2 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <p className="text-sm font-black uppercase tracking-wider">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'tenant' })}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95
                ${formData.role === 'tenant' ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50/50'}
              `}
            >
              <div className={`p-2 rounded-xl ${formData.role === 'tenant' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                <User size={24} />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${formData.role === 'tenant' ? 'text-indigo-600' : 'text-slate-400'}`}>Tenant</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'landlord' })}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95
                ${formData.role === 'landlord' ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50/50'}
              `}
            >
              <div className={`p-2 rounded-xl ${formData.role === 'landlord' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                <Briefcase size={24} />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${formData.role === 'landlord' ? 'text-indigo-600' : 'text-slate-400'}`}>Landlord</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Username</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold placeholder:text-slate-400"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold placeholder:text-slate-400"
                placeholder="you@luxerent.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold placeholder:text-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-slate-300 flex items-center justify-center gap-3"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Account <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-500 font-bold">
            Already a member?{' '}
            <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors underline decoration-2 underline-offset-4">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

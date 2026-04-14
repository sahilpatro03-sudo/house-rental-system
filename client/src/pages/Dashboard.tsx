import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit3, MapPin, IndianRupee, Bed, LayoutDashboard, PlusSquare, X, Sparkles, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { token, user } = useAuth();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rent: '',
    rooms: '',
    category: 'bachelor_boy',
    contact_info: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchMyHouses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/houses/my-listings');
      setHouses(response.data);
    } catch (err) {
      console.error('Error fetching houses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyHouses();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/api/houses', {
        ...formData,
        rent: Number(formData.rent),
        rooms: Number(formData.rooms)
      });
      setShowAddModal(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        rent: '',
        rooms: '',
        category: 'bachelor_boy',
        contact_info: ''
      });
      fetchMyHouses();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add house');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await api.delete(`/api/houses/${id}`);
      fetchMyHouses();
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-indigo-600 pt-12 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight uppercase">Landlord Dashboard</h1>
            </div>
            <p className="text-indigo-100 font-medium">Manage your properties and track listings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-xl hover:bg-indigo-50 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Listing
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16">
        {loading ? (
          <div className="bg-white rounded-[3rem] p-32 shadow-2xl shadow-indigo-100 border border-slate-50 flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Listings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houses.length > 0 ? (
              houses.map((house: any) => (
                <div key={house.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-slate-50 overflow-hidden group">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {house.category.replace('_', ' ')}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(house.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight line-clamp-1">{house.title}</h3>
                    <div className="flex items-center text-slate-500 font-bold text-xs mb-6 uppercase tracking-widest">
                      <MapPin size={14} className="mr-1.5 text-indigo-400" /> {house.location}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Rent</span>
                        <div className="flex items-center text-xl font-black text-slate-900">
                          <IndianRupee size={16} className="mr-0.5 text-indigo-600" /> {house.rent}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Configuration</span>
                        <div className="flex items-center text-xl font-black text-slate-900">
                          <Bed size={18} className="mr-2 text-slate-400" /> {house.rooms} BHK
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-indigo-100">
                <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlusSquare className="text-indigo-300" size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">No active listings</h3>
                <p className="text-slate-500 font-medium mb-8">Start by adding your first property to LuxeRent</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Create Listing
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add New Property</h2>
                  <p className="text-slate-500 font-medium mt-1">Fill in the details for your new listing</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 p-5 rounded-3xl mb-8 flex items-center gap-4">
                  <div className="bg-rose-100 p-2 rounded-xl">
                    <AlertCircle size={20} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-wider">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Property Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury 2BHK in South Delhi"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Rent (Monthly)</label>
                  <input
                    type="number"
                    name="rent"
                    required
                    value={formData.rent}
                    onChange={handleInputChange}
                    placeholder="₹ 0.00"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Number of Rooms</label>
                  <input
                    type="number"
                    name="rooms"
                    required
                    value={formData.rooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 2"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Target Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold cursor-pointer"
                  >
                    <option value="bachelor_boy">Bachelor Boy</option>
                    <option value="bachelor_girl">Bachelor Girl</option>
                    <option value="couple">Married Couple</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Contact Information</label>
                  <input
                    type="text"
                    name="contact_info"
                    required
                    value={formData.contact_info}
                    onChange={handleInputChange}
                    placeholder="e.g., Phone: +91 9876543210"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the amenities, nearby landmarks, etc."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 font-bold resize-none"
                  ></textarea>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-slate-300 flex items-center justify-center gap-3"
                  >
                    {submitting ? 'Creating listing...' : (
                      <>
                        Publish Property <Sparkles size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import api from '../api';
import HouseCard from '../components/HouseCard';
import { Search, Filter, X, Sparkles, MapPin, BadgeIndianRupee, Home as HomeIcon } from 'lucide-react';

const Home: React.FC = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minRent: '',
    maxRent: '',
    rooms: ''
  });

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await api.get(`/api/houses?${params.toString()}`);
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ category: '', location: '', minRent: '', maxRent: '', rooms: '' });
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden border-b border-indigo-50/50">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-200/20 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[50%] bg-blue-200/20 blur-[100px] rounded-full animate-float-delayed"></div>
        
        {/* Decorative Floating Shapes */}
        <div className="absolute top-20 left-[15%] w-12 h-12 bg-indigo-500/10 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute bottom-40 right-[20%] w-16 h-16 bg-blue-500/10 rounded-full animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> The Best Rentals in Town
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Find Your <span className="text-indigo-600">Dream Home</span> <br /> 
            Without the Hassle.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium">
            Discover premium rental properties tailored for bachelors, couples, and families. 
            Modern living made simple.
          </p>

          {/* Search/Filter Bar */}
          <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl p-3 md:p-5 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              <div className="flex flex-col text-left group">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 mb-1 ml-1 group-hover:text-indigo-600 transition-colors">
                  <HomeIcon size={12} /> Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent border-none text-slate-800 font-bold focus:ring-0 cursor-pointer p-0"
                >
                  <option value="">Any Category</option>
                  <option value="bachelor_boy">Bachelor Boy</option>
                  <option value="bachelor_girl">Bachelor Girl</option>
                  <option value="couple">Married Couple</option>
                  <option value="family">Family</option>
                </select>
              </div>
              
              <div className="hidden sm:block w-[1px] h-10 bg-indigo-50 self-center"></div>

              <div className="flex flex-col text-left group">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 mb-1 ml-1 group-hover:text-indigo-600 transition-colors">
                  <MapPin size={12} /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Where to?"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent border-none text-slate-800 font-bold placeholder:text-slate-400 focus:ring-0 p-0"
                />
              </div>

              <div className="hidden lg:block w-[1px] h-10 bg-indigo-50 self-center"></div>

              <div className="flex flex-col text-left group">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 mb-1 ml-1 group-hover:text-indigo-600 transition-colors">
                  <BadgeIndianRupee size={12} /> Max Budget
                </label>
                <input
                  type="number"
                  name="maxRent"
                  placeholder="How much?"
                  value={filters.maxRent}
                  onChange={handleFilterChange}
                  className="w-full bg-transparent border-none text-slate-800 font-bold placeholder:text-slate-400 focus:ring-0 p-0"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="p-4 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-3xl transition-all"
                title="Reset Filters"
              >
                <X size={24} />
              </button>
              <button
                onClick={fetchHouses}
                className="flex-grow lg:flex-none bg-indigo-600 text-white px-10 py-4 rounded-[1.8rem] font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
              >
                <Search size={20} /> Find Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Available Listings</h2>
            <p className="text-slate-500 font-medium mt-1">Handpicked homes just for you</p>
          </div>
          <div className="flex gap-2 bg-indigo-50 p-1.5 rounded-2xl">
             <div className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-sm font-black shadow-sm">All</div>
             <div className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-indigo-600 transition-colors cursor-pointer">Trending</div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Searching LuxeRent...</p>
          </div>
        ) : (
          <>
            {houses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {houses.map((house: any) => (
                  <HouseCard key={house.id} house={house} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-indigo-200 shadow-sm">
                <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="text-indigo-300" size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No Matches Found</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
                  We couldn't find any listings matching those filters. Try broadening your search!
                </p>
                <button 
                  onClick={clearFilters}
                  className="text-indigo-600 font-black uppercase text-sm tracking-widest hover:text-indigo-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

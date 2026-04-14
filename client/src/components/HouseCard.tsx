import React from 'react';
import { MapPin, IndianRupee, Bed, ArrowUpRight, Heart } from 'lucide-react';

interface House {
  id: number;
  title: string;
  location: string;
  rent: number;
  rooms: number;
  category: string;
  description: string;
  contact_info: string;
}

const HouseCard: React.FC<{ house: House }> = ({ house }) => {
  const formatCategory = (cat: string) => {
    return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getRandomGradient = (id: number) => {
    const gradients = [
      'from-indigo-500 to-blue-600',
      'from-blue-500 to-cyan-500',
      'from-violet-500 to-purple-600',
      'from-slate-700 to-slate-900',
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="card-hover bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group">
      <div className={`relative h-64 bg-gradient-to-br ${getRandomGradient(house.id)} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 text-white font-black uppercase tracking-widest text-xs">
          Luxe Listing
        </div>
        <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/30 hover:bg-rose-500 hover:border-rose-500 transition-all">
          <Heart size={20} />
        </button>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3">
              {formatCategory(house.category)}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {house.title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center text-slate-500 font-semibold text-sm mb-6">
          <MapPin size={16} className="mr-1.5 text-indigo-400" /> {house.location}
        </div>
        
        <div className="flex items-center justify-between py-6 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Monthly Rent</span>
            <div className="flex items-baseline text-2xl font-black text-slate-900">
              <IndianRupee size={20} className="mr-0.5 text-indigo-600" /> {house.rent.toLocaleString()}
              <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
            <Bed size={18} className="text-slate-400" />
            <span className="text-sm font-black text-slate-700">{house.rooms} Rooms</span>
          </div>
        </div>
        
        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-[0.98]">
          View Property <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default HouseCard;

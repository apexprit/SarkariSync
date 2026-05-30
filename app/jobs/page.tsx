"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, ExternalLink, Clock, RefreshCw, Bookmark, BookmarkCheck, ArrowUpDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Job {
  title: string;
  organization: string;
  link: string;
  date: string;
  qualification: string;
  type: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'org'>('newest');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');

  const categories = ['All', 'Technical', 'General', 'Saved'];

  useEffect(() => {
    const saved = localStorage.getItem('sarkarisync_saved');
    if (saved) setSavedJobs(JSON.parse(saved));
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/notifications.json');
      const data = await response.json();
      setJobs(data);
      setLastUpdated(new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = (link: string) => {
    const newSaved = savedJobs.includes(link) 
      ? savedJobs.filter(l => l !== link) 
      : [...savedJobs, link];
    setSavedJobs(newSaved);
    localStorage.setItem('sarkarisync_saved', JSON.stringify(newSaved));
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All' || job.type === filter;
      const isSavedOnly = filter === 'Saved' ? savedJobs.includes(job.link) : true;
      return matchesSearch && matchesFilter && isSavedOnly;
    })
    .sort((a, b) => {
      if (sortBy === 'org') return a.organization.localeCompare(b.organization);
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

  const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-[#0F172A] mb-4 tracking-tight leading-tight">
              Opportunities <br /> 
              <span className="text-blue-600">Verified & Live.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium">
              Find your next role in India's top R&D and Government sectors.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
              <Clock className="text-blue-600" size={18} />
              <div className="hidden sm:block">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Status</p>
                <p className="text-xs font-bold text-slate-900">{lastUpdated || 'Updating...'}</p>
              </div>
              <button onClick={fetchJobs} className="ml-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <RefreshCw size={16} className={loading ? 'animate-spin text-blue-600' : 'text-slate-400'} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Toolbar Section */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs, organizations, or keywords..."
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-slate-50 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setSortBy('newest')}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                    sortBy === 'newest' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Newest First
                </button>
                <button 
                  onClick={() => setSortBy('org')}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                    sortBy === 'org' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  By Organization
                </button>
              </div>

              <div className="h-10 w-px bg-slate-200 hidden lg:block mx-2" />

              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all text-sm flex items-center gap-2 border",
                      filter === cat 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-600 hover:text-blue-600"
                    )}
                  >
                    {cat === 'Saved' && <Bookmark size={14} />}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="w-12 h-12 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin mb-6" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Database...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, idx) => (
                  <motion.div 
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={idx}
                    key={job.link + idx}
                    className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-500 border border-slate-100 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <span className={cn(
                          "px-4 py-1.5 text-[10px] font-black rounded-full uppercase border tracking-tight",
                          job.type === 'Technical' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {job.type}
                        </span>
                        <button 
                          onClick={() => toggleSave(job.link)}
                          className={cn(
                            "p-2.5 rounded-xl transition-all active:scale-90",
                            savedJobs.includes(job.link) ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                          )}
                        >
                          {savedJobs.includes(job.link) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>

                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-slate-400 font-black text-[10px] mb-8 uppercase tracking-[0.1em]">{job.organization}</p>
                      
                      <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
                          <MapPin size={16} className="text-slate-300" /> Multiple Locations
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
                          <Calendar size={16} className="text-slate-300" /> {job.date}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => window.open(job.link, '_blank')}
                      className="w-full py-5 bg-[#0F172A] text-white font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-slate-100"
                    >
                      Apply Now <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                    
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl" />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                    <Filter size={48} />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0F172A] mb-2">No matches found.</h4>
                  <p className="text-slate-400 font-medium">Try resetting your filters or check back later.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

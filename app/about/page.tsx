"use client";

import { motion } from 'framer-motion';
import { Target, Zap, Shield, Rocket } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Departments', value: '100+', icon: Target },
    { label: 'Latency', value: '<5min', icon: Zap },
    { label: 'Verified', value: '100%', icon: Shield },
    { label: 'Success Rate', value: '98%', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8 tracking-tight"
          >
            The Future of <span className="text-blue-600">Job Alerts.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            SarkariSync is a high-performance synchronization engine built to bridge the gap between government job notifications and aspiring candidates.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-[#0F172A] tracking-tight">Our Mission</h3>
            <div className="space-y-6 text-lg text-slate-600 font-medium">
              <p>
                In a landscape where information is scattered across hundreds of department websites like ISRO, DRDO, BARC, and SSC, we provide a centralized, verified, and real-time alert system.
              </p>
              <p>
                Our mission is to ensure that no qualified candidate misses a life-changing career opportunity due to a lack of notification. We believe in transparency, speed, and accuracy above all else.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-white space-y-4">
                  <div className="text-6xl font-black tracking-tighter">100k+</div>
                  <div className="text-xl font-bold opacity-80 uppercase tracking-widest">Candidates Synced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { Send, CheckCircle, Bell, Smartphone, ArrowRight, Zap, Shield } from 'lucide-react';

export default function NotificationsPage() {
  const steps = [
    {
      title: "Select Your Level",
      desc: "Choose between 10th, 12th, or Graduate roles inside the bot.",
      icon: CheckCircle,
      color: "bg-blue-600",
      shadow: "shadow-blue-200"
    },
    {
      title: "Instant Notifications",
      desc: "No more checking websites. We ping you the moment a link goes live.",
      icon: Bell,
      color: "bg-indigo-600",
      shadow: "shadow-indigo-200"
    },
    {
      title: "Mobile Optimized",
      desc: "Access application links directly from your Telegram chat.",
      icon: Smartphone,
      color: "bg-purple-600",
      shadow: "shadow-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-black mb-6"
          >
            <Zap size={16} fill="currentColor" /> REAL-TIME SYNCHRONIZATION
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#0F172A] mb-8 tracking-tight"
          >
            Smart Job <span className="text-blue-600">Sync.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto font-medium"
          >
            Connect your Telegram and get personalized government job alerts the second they are published.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                <div className={`flex-shrink-0 w-16 h-16 ${step.color} text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl ${step.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#0F172A] mb-2">{step.title}</h4>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative z-10 overflow-hidden text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Send size={48} />
              </div>
              <h3 className="text-3xl font-black text-[#0F172A] mb-6 tracking-tight">Ready to Start?</h3>
              <p className="text-slate-500 mb-12 text-lg font-medium">Join 50,000+ candidates receiving instant alerts daily.</p>
              
              <a 
                href="https://t.me/SarkariSyncBot" 
                target="_blank" 
                className="group w-full inline-flex items-center justify-center gap-4 px-10 py-6 bg-[#0F172A] text-white font-black rounded-3xl shadow-2xl hover:bg-blue-600 transition-all text-xl"
              >
                Launch @SarkariSyncBot 
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </a>

              <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 font-bold text-sm uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Shield size={16} /> Secure
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} /> Fast
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

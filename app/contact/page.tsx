"use client";

import { motion } from 'framer-motion';
import { Send, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const channels = [
    {
      title: "Support Bot",
      value: "@SarkariSyncBot",
      link: "https://t.me/SarkariSyncBot",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Email Support",
      value: "sir@sarkarisync.com",
      link: "mailto:sir@sarkarisync.com",
      icon: Mail,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-black text-[#0F172A] mb-8 tracking-tight"
          >
            Let's <span className="text-blue-600">Connect.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 font-medium"
          >
            Have questions about a notification? Need help with the bot? <br className="hidden md:block" />
            Our team is ready to assist you in your career journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {channels.map((channel, i) => (
              <motion.a
                key={channel.title}
                href={channel.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${channel.bg} ${channel.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <channel.icon size={28} />
                </div>
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">{channel.title}</h4>
                <div className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {channel.value}
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}

            {/* Additional Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-[#0F172A] p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Live Chat Support</h4>
                  <p className="text-slate-400 font-medium">Available Monday to Friday, 9AM - 6PM IST</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black transition-all whitespace-nowrap">
                Start Conversation
              </button>
            </motion.div>
          </div>

          {/* Office/Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 text-emerald-600 font-bold mb-8 bg-emerald-50 w-fit px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              All Systems Operational
            </div>
            
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Headquarters</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-blue-600 flex-shrink-0" size={24} />
                <p className="text-slate-600 font-medium leading-relaxed">
                  Tech Park Hub, Sector 62 <br />
                  Noida, Uttar Pradesh <br />
                  India - 201301
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

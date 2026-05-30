"use client";

import Link from 'next/link';
import { ArrowRight, Bell, Zap, Shield, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-full text-sm font-black mb-10 shadow-sm border border-slate-100"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              NOW LIVE FOR 2026 NOTIFICATIONS
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-[#0F172A] mb-10 leading-[1.1] tracking-tight"
            >
              Every Government Job, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Synchronized to You.
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-500 mb-14 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              The ultimate synchronization engine for NITians and serious job seekers. 
              Real-time alerts for ISRO, DRDO, SSC, and 100+ departments delivered instantly.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/jobs" className="group px-12 py-6 bg-[#0F172A] text-white font-black rounded-[2rem] shadow-2xl hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-xl">
                Browse Jobs <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/notifications" className="group px-12 py-6 bg-white text-[#0F172A] font-black rounded-[2rem] shadow-xl hover:shadow-2xl border border-slate-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-xl">
                <Bell size={24} className="group-hover:rotate-12 transition-transform" /> Sync Telegram
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Shield, 
                title: "Verified Sources", 
                desc: "Every notification is cross-checked with official department portals to ensure 100% accuracy.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                icon: Zap, 
                title: "Instant Alerts", 
                desc: "Get notified within minutes of the official release directly on your Telegram app.",
                color: "text-amber-500",
                bg: "bg-amber-50"
              },
              { 
                icon: Briefcase, 
                title: "Multi-Level Filters", 
                desc: "Smart filtering for 10th pass, 12th pass, and Technical Graduate roles tailored for you.",
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start p-10 bg-[#F8FAFC] rounded-[3rem] border border-slate-50 hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Call to Action */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to synchronize your career?</h2>
                <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">Join thousands of students from top Indian institutes who never miss an opportunity.</p>
                <Link href="/notifications" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all text-lg group">
                  Get Started Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <div className="text-4xl font-black text-white mb-2">50k+</div>
                  <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Active Users</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <div className="text-4xl font-black text-white mb-2">120+</div>
                  <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Departments</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center col-span-2">
                  <div className="text-4xl font-black text-white mb-2">100%</div>
                  <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Verified Notifications</div>
                </div>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

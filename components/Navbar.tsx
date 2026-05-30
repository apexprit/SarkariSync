"use client";

import Link from 'next/link';
import { Briefcase, Bell, Info, Mail, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
              <span className="text-white font-black text-2xl">S</span>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter">SarkariSync</h1>
          </Link>
          
          <div className="hidden md:flex space-x-1 items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-[#0F172A] hover:bg-white/50'
                  }`}
                >
                  <link.icon size={16} /> {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/contact" className="group px-6 py-3 bg-[#0F172A] text-white rounded-xl hover:bg-blue-600 transition-all font-black text-sm flex items-center gap-2 shadow-lg hover:shadow-blue-100">
              Contact Us <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2.5 bg-slate-100 text-[#0F172A] rounded-xl hover:bg-slate-200 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-xl font-black text-[#0F172A]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <link.icon size={20} className="text-blue-600" />
                  </div>
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="flex items-center justify-center w-full p-5 bg-[#0F172A] text-white rounded-2xl font-black text-xl"
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

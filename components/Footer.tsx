import { Send, Globe, Link2, Hash } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <h2 className="text-xl font-black text-[#0F172A] tracking-tighter">SarkariSync</h2>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              The premier synchronization platform for government job notifications. Real-time, verified, and direct.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Globe, href: '#' },
                { icon: Link2, href: '#' },
                { icon: Hash, href: '#' },
                { icon: Send, href: 'https://t.me/SarkariSyncBot' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-8">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/jobs" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Browse Jobs</Link></li>
              <li><Link href="/notifications" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Sync Bot</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Our Mission</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 font-bold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-slate-500 font-medium mb-6">Stay updated with our weekly digest of top opportunities.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium shadow-inner"
              />
              <button className="absolute right-2 top-2 p-2.5 bg-[#0F172A] text-white rounded-xl hover:bg-blue-600 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-sm">
            © {currentYear} SarkariSync. Built for serious aspirants.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-slate-400 font-bold text-sm tracking-tight">System Status: 100% Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

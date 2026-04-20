import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../lib/data';
import * as Icons from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Home() {
  const { user, userData } = useAuth();

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section - Simplified and Clean */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold uppercase tracking-[2px] text-primary mb-4">
            Intellectual Mastery Platform
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            Think <span className="text-primary italic font-serif">Deeply</span>. <br />Learn Daily.
          </h1>
          <p className="text-xl text-text-dim max-w-2xl mx-auto font-light leading-relaxed">
            Elevate your cognitive boundaries with <span className="text-white font-medium">Dynamic AI challenges</span> curated across 12 distinct knowledge domains.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-6 pt-6"
        >
          {user ? (
            <Link to="/dashboard" className="btn-minimal-filled px-10">
              Go to Dashboard <Icons.ArrowRight size={20} />
            </Link>
          ) : (
            <Link to="/auth" className="btn-minimal-filled px-10">
              Get Started <Icons.ChevronRight size={20} />
            </Link>
          )}
          <Link to="/leaderboard" className="text-sm font-bold border-b border-primary/50 pb-1 hover:border-primary transition-colors">
            Global Standings
          </Link>
        </motion.div>
      </section>

      {/* Categories Grid - Clean Cards */}
      <section>
        <div className="flex items-end justify-between mb-12 border-b border-border-dim pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight">Active Domains</h2>
            <p className="text-text-dim text-sm">Select a category to begin your advancement.</p>
          </div>
          <div className="stat-label-dim font-black">{CATEGORIES.length} Domains Available</div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CATEGORIES.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            return (
              <motion.div key={cat.id} variants={item}>
                <div className="clean-card h-full flex flex-col items-start gap-6 group relative">
                    <div className="w-14 h-14 bg-bg-dark border border-border-dim rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bg-dark transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{cat.name}</h3>
                      <p className="text-text-dim text-sm leading-relaxed">{cat.description}</p>
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Difficulty</span>
                         <span className={cn(
                           "text-[10px] font-black uppercase tracking-widest",
                           cat.difficulty === 'Easy' ? "text-green-500" :
                           cat.difficulty === 'Medium' ? "text-yellow-500" :
                           "text-red-500"
                         )}>
                           {cat.difficulty}
                         </span>
                      </div>
                      <Link to={`/quiz/${cat.id}`} className="btn-minimal w-full">
                        Enter Domain
                      </Link>
                    </div>
                    
                    {/* Minimal decorative corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-3xl group-hover:bg-primary/10 transition-colors"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Stats - Minimalist Layout */}
      <section className="border-y border-border-dim py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <div className="stat-value-gold text-5xl mb-2">500+</div>
          <div className="stat-label-dim">Curated Questions</div>
        </div>
        <div className="border-x border-border-dim hidden md:block px-12">
          <div className="stat-value-gold text-5xl mb-2">12k</div>
          <div className="stat-label-dim">Scholarly Minds</div>
        </div>
        <div className="md:hidden border-y border-border-dim py-12">
          <div className="stat-value-gold text-5xl mb-2">12k</div>
          <div className="stat-label-dim">Scholarly Minds</div>
        </div>
        <div>
          <div className="stat-value-gold text-5xl mb-2">Unlimited</div>
          <div className="stat-label-dim">Cognitive Potential</div>
        </div>
      </section>
    </div>
  );
}

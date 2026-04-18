/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ChevronRight, 
  BrainCircuit, 
  Zap, 
  Target, 
  Crown, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Layers,
  Award,
  CircleArrowRight,
  RefreshCw,
  Sparkles
} from "lucide-react";

// --- Types ---

interface Scenario {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Option {
  label: string;
  value: string;
  weights: {
    aggressive: number;
    prudent: number;
    social: number;
    growth: number;
  };
}

interface Outcome {
  title: string;
  description: string;
  recommendation: string;
  riskProfile: string;
  confidence: number;
}

// --- Data ---

const SCENARIOS: Scenario[] = [
  {
    id: "career",
    title: "Strategic Evolution",
    description: "Should you pursue the high-risk executive pivot or consolidate your current leadership position?",
    questions: [
      {
        id: "hours",
        text: "What is your current cognitive bandwidth?",
        options: [
          { label: "Surplus (12+ hours daily)", value: "high", weights: { aggressive: 10, prudent: -5, social: -2, growth: 8 } },
          { label: "Optimized (8 hours deeply)", value: "med", weights: { aggressive: 5, prudent: 5, social: 5, growth: 5 } },
          { label: "Critical (Restricted focus)", value: "low", weights: { aggressive: -10, prudent: 10, social: 2, growth: -5 } },
        ]
      },
      {
        id: "horizon",
        text: "What is your primary success horizon?",
        options: [
          { label: "Instant dominance (Next 6 months)", value: "short", weights: { aggressive: 15, prudent: -10, social: 5, growth: 2 } },
          { label: "Generational legacy (5+ years)", value: "long", weights: { aggressive: 2, prudent: 15, social: 8, growth: 15 } },
        ]
      },
      {
        id: "financial",
        text: "Capital liquidity status?",
        options: [
          { label: "Aggressive reserve", value: "high", weights: { aggressive: 10, prudent: -2, social: 5, growth: 10 } },
          { label: "Structured stability", value: "med", weights: { aggressive: 2, prudent: 10, social: 5, growth: 5 } },
        ]
      }
    ]
  },
  {
    id: "daily",
    title: "Performance Equilibrium",
    description: "Should you prioritize intensive study/work or engage in restorative recreation?",
    questions: [
      {
        id: "urgency",
        text: "How imminent is the 'Proof of Performance' (Exam/Deadline)?",
        options: [
          { label: "Immediate (< 24 hours)", value: "critical", weights: { aggressive: 20, prudent: -10, social: -10, growth: 15 } },
          { label: "Strategic (72+ hours)", value: "relaxed", weights: { aggressive: 5, prudent: 15, social: 10, growth: 10 } },
        ]
      },
      {
        id: "energy",
        text: "Neuro-chemical state (Energy level)?",
        options: [
          { label: "Peak (Focused/Flow)", value: "high", weights: { aggressive: 15, prudent: 5, social: -5, growth: 20 } },
          { label: "Diminished (Tired/Anxious)", value: "low", weights: { aggressive: -15, prudent: 20, social: 15, growth: -10 } },
        ]
      }
    ]
  }
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-luxury-black/50 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-black font-bold">A</div>
      <span className="text-xl font-serif tracking-widest uppercase group-hover:text-gold transition-colors">Axiom</span>
    </div>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/60">
      <a href="#intelligence" className="hover:text-gold transition-colors">Intelligence</a>
      <a href="#ecosystem" className="hover:text-gold transition-colors">Ecosystem</a>
      <a href="#about" className="hover:text-gold transition-colors">About</a>
    </div>
    <button className="gold-border px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-black transition-all">
      Deploy Axiom
    </button>
  </nav>
);

const DecisionEngine = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Option[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setCurrentStep(0);
    setSelections([]);
    setOutcome(null);
  };

  const handleOptionSelect = (option: Option) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);

    if (activeScenario && currentStep < activeScenario.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newSelections);
    }
  };

  const calculateResult = (finalSelections: Option[]) => {
    setIsLoading(true);
    // Simulate complex calculation
    setTimeout(() => {
      const totals = { aggressive: 0, prudent: 0, social: 0, growth: 0 };
      finalSelections.forEach(s => {
        totals.aggressive += s.weights.aggressive;
        totals.prudent += s.weights.prudent;
        totals.social += s.weights.social;
        totals.growth += s.weights.growth;
      });

      let res: Outcome;
      if (totals.aggressive > totals.prudent && totals.aggressive > 15) {
        res = {
          title: "The Assertive Move",
          description: "Your data suggests a power-vacuum. Hedging now results in decayed leverage.",
          recommendation: "Execute with maximum velocity. Delay is the primary risk factor.",
          riskProfile: "High - Disruptive",
          confidence: 94
        };
      } else if (totals.prudent > totals.aggressive) {
        res = {
          title: "Consolidated Precision",
          description: "Market or biological indicators suggest a phase of preservation. Sustainability beats intensity.",
          recommendation: "Standardize your current gains. Diversify your risk through active rest or lateral moves.",
          riskProfile: "Conservative - Strategic",
          confidence: 98
        };
      } else {
        res = {
          title: "The Balanced Hybrid",
          description: "Equilibrium detected. A dual-track approach minimizes entropy while capturing upside.",
          recommendation: "Commit 60% to production and 40% to discovery/rest.",
          riskProfile: "Balanced",
          confidence: 88
        };
      }
      setOutcome(res);
      setIsLoading(false);
    }, 1500);
  };

  const reset = () => {
    setActiveScenario(null);
    setCurrentStep(0);
    setSelections([]);
    setOutcome(null);
  };

  return (
    <div id="intelligence" className="min-h-screen container mx-auto px-6 py-32 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-2xl"
      >
        <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Engine Core v4.2</span>
        <h2 className="text-5xl md:text-6xl mb-6">Decision Intelligence</h2>
        <p className="text-white/40 leading-relaxed italic">
          Navigate uncertainty with algorithmic certainty. Select your domain to begin the simulation.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl min-h-[500px] glass rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
        {!activeScenario ? (
          <div className="grid md:grid-cols-2 gap-6 w-full h-full">
            {SCENARIOS.map((s) => (
              <motion.button
                key={s.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScenarioSelect(s)}
                className="group relative p-8 rounded-2xl border border-white/10 hover:border-gold/50 bg-white/5 text-left transition-all"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  {s.id === 'career' ? <Award size={24} /> : <Activity size={24} />}
                </div>
                <h3 className="text-2xl mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.description}</p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Initiate <ArrowRight size={14} />
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-20"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-8 text-gold"
                >
                  <RefreshCw size={48} />
                </motion.div>
                <h3 className="text-2xl mb-2 italic">Synthesizing Consequences</h3>
                <p className="text-white/40 text-sm">Processing {selections.length} weighted variables...</p>
              </motion.div>
            ) : outcome ? (
              <motion.div 
                key="outcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-6 px-4 py-1 rounded-full bg-gold/20 text-gold text-[10px] uppercase tracking-[0.3em] font-bold">
                  Recommended Move
                </div>
                <h3 className="text-4xl md:text-5xl mb-6 gold-gradient">{outcome.title}</h3>
                <p className="text-xl text-white/80 mb-8 max-w-xl text-center font-light">
                  "{outcome.description}"
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-12">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <span className="block text-[10px] uppercase text-white/40 tracking-widest mb-1">Risk Profile</span>
                    <span className="text-sm font-semibold">{outcome.riskProfile}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <span className="block text-[10px] uppercase text-white/40 tracking-widest mb-1">Confidence Score</span>
                    <span className="text-sm font-semibold">{outcome.confidence}%</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 mb-12 w-full max-w-lg">
                  <h4 className="text-xs uppercase text-gold tracking-widest mb-3 flex items-center gap-2">
                    <BrainCircuit size={14} /> Refined Strategy
                  </h4>
                  <p className="text-white/70 italic text-sm leading-relaxed">
                    {outcome.recommendation}
                  </p>
                </div>

                <button 
                  onClick={reset}
                  className="text-white/40 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                >
                  Reset Intelligence Engine <RefreshCw size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] uppercase text-gold tracking-widest">Question {currentStep + 1} of {activeScenario.questions[currentStep + 1] ? activeScenario.questions.length : activeScenario.questions.length}</span>
                  <button onClick={reset} className="text-white/20 hover:text-white transition-colors"><RefreshCw size={16} /></button>
                </div>
                
                <h3 className="text-3xl md:text-4xl mb-12 font-serif max-w-2xl leading-tight italic">
                  {activeScenario.questions[currentStep].text}
                </h3>

                <div className="grid gap-4">
                  {activeScenario.questions[currentStep].options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
                      onClick={() => handleOptionSelect(opt)}
                      className="group flex justify-between items-center p-6 rounded-xl border border-white/10 bg-white/5 text-left transition-all"
                    >
                      <span className="text-lg font-light group-hover:text-gold transition-colors">{opt.label}</span>
                      <ChevronRight size={20} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const FeatureSection = () => (
  <section id="ecosystem" className="py-32 bg-luxury-black overflow-hidden relative">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Unrivaled Methodology</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Advanced Logic for the Sovereign Decision Maker.</h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              Most tools use static checklists. Axiom employs dynamic weighted heuristics and consequence simulation to reveal the path of least resistance.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: BrainCircuit, title: "Adaptive Logic", desc: "Our engine recalibrates based on real-time neuro-chemical and economic inputs." },
                { icon: Zap, title: "Velocity Oriented", desc: "Prioritizing momentum over perfection where the window of opportunity is narrow." },
                { icon: ShieldCheck, title: "Risk Mitigation", desc: "Sophisticated stress-testing of every recommended move within our sandbox." }
              ].map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full gold-border flex items-center justify-center text-gold">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 font-medium">{f.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-7 relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative z-10 p-4 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent gold-border aspect-square max-w-md mx-auto flex items-center justify-center"
          >
            <div className="w-full h-full rounded-[2.5rem] bg-luxury-black overflow-hidden relative flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 opacity-20"
               >
                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-dashed border-gold rounded-full scale-150"></div>
                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-dashed border-white/20 rounded-full scale-110"></div>
                 <div className="absolute top-0 left-0 w-full h-full border-[1px] border-dashed border-gold/50 rounded-full scale-75"></div>
               </motion.div>
               <div className="relative text-center p-8">
                 <Sparkles className="text-gold mx-auto mb-4" size={32} />
                 <h3 className="text-2xl font-serif mb-2">Refining Outcomes</h3>
                 <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">Iteration 014A // Consequence Verified</p>
               </div>
            </div>
          </motion.div>
          
          {/* Decorative gradients */}
          <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-luxury-black border-t border-white/5">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gold flex items-center justify-center text-black text-[10px] font-bold">A</div>
        <span className="text-sm font-serif tracking-[0.3em] uppercase">Axiom Intelligence</span>
      </div>
      <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
        <a href="#" className="hover:text-gold transition-colors">Privacy Codex</a>
        <a href="#" className="hover:text-gold transition-colors">Term of Intelligence</a>
        <a href="#" className="hover:text-gold transition-colors">Access Console</a>
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 italic">
        © 2026 Axiom Collective. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="relative selection:bg-gold selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-6 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.6em] mb-8 block">Refining Choice Into Outcome</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-12 font-serif font-light leading-tight">
              Axiom <span className="italic">Decision</span> <br className="hidden md:block" /> Intelligence.
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="#intelligence" className="px-10 py-5 rounded-full bg-gold text-black font-semibold text-sm uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3">
                Begin Intelligence Cycle <CircleArrowRight size={18} />
              </a>
              <button className="px-10 py-5 rounded-full gold-border text-white/80 text-sm uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                Explore The Ecosystem
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[160px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-luxury-black to-transparent"></div>
          
          {/* Animated lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ rotate: i * 45 }}
                animate={{ rotate: (i * 45) + 360 }}
                transition={{ duration: 10 + (i * 10), repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
                style={{ width: 400 + (i * 200), height: 400 + (i * 200) }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Decision Engine App */}
      <DecisionEngine />

      {/* Feature Section */}
      <FeatureSection />

      {/* Social Proof / Reviews section (Luxury style) */}
      <section className="py-32 border-y border-white/5 bg-luxury-gray">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Legacy Endorsements</span>
             <h2 className="text-4xl md:text-5xl">The Axiom Experience</h2>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: "Julian Thorne", role: "Venture Principal", quote: "The Decision Engine correctly identified a liquidity trap 6 months before our analysts. It's no longer optional." },
               { name: "Elara Vance", role: "Creative Director", quote: "It brings a level of strategic clarity that I thought was only possible through years of meditation." },
               { name: "Marcus Blackwell", role: "Competitive Athlete", quote: "I use the Daily Grind mode every morning. It's the coach I didn't know I needed." }
             ].map((r, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -10 }}
                 className="p-8 rounded-3xl bg-luxury-black border border-white/5 italic"
               >
                 <Sparkles className="text-gold/30 mb-6" size={20} />
                 <p className="text-white/60 mb-8 leading-relaxed font-light">"{r.quote}"</p>
                 <div>
                   <span className="block text-sm font-semibold">{r.name}</span>
                   <span className="text-[10px] uppercase tracking-widest text-gold/60">{r.role}</span>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl mb-12 max-w-4xl mx-auto font-serif leading-tight">
              Make your next move with <span className="italic italic-small gold-gradient">absolute</span> confidence.
            </h2>
            <button className="px-12 py-6 rounded-full bg-gold text-black font-bold text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:scale-105 transition-all">
              Initiate Access
            </button>
          </motion.div>
        </div>
        
        {/* Decorative background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <Layers className="w-full h-full text-white/5" strokeWidth={0.5} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

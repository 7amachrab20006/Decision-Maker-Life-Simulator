import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Mail, Lock, User, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        
        // Save to Firestore
        const registrationDate = new Date().toISOString();
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          username,
          email,
          totalQuizzes: 0,
          avgScore: 0,
          createdAt: registrationDate,
          lastActivity: registrationDate
        });

        // Notify admin via server
        try {
          await fetch('/api/notify-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, registrationDate })
          });
        } catch (err) {
          console.error('Failed to notify admin', err);
        }
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="clean-card p-10 md:p-14 w-full max-w-md relative"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-2 tracking-tighter">
            {isLogin ? 'Authenticating.' : 'Inauguration.'}
          </h2>
          <p className="text-text-dim text-sm font-medium tracking-tight">
            {isLogin ? 'Access your secure knowledge dashboard.' : 'Initialize your official scholarly record.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-[10px] uppercase tracking-[2px] text-text-dim font-black ml-1">Candidacy Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim opacity-40" size={18} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-bg-dark border border-border-dim rounded-lg py-3.5 pl-12 pr-4 focus:border-primary outline-none transition-all placeholder:text-white/5 text-sm"
                    placeholder="Enter Username"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[2px] text-text-dim font-black ml-1">Secure Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim opacity-40" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-dark border border-border-dim rounded-lg py-3.5 pl-12 pr-4 focus:border-primary outline-none transition-all placeholder:text-white/5 text-sm"
                placeholder="Ex: scholardemo@ais.app"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[2px] text-text-dim font-black ml-1">Keyphrase</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim opacity-40" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-dark border border-border-dim rounded-lg py-3.5 pl-12 pr-4 focus:border-primary outline-none transition-all placeholder:text-white/5 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-500/5 border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[1px] rounded"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="btn-minimal-filled w-full py-4 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-primary rounded-full animate-spin"></div>
            ) : isLogin ? (
              <>Initiate Session <LogIn size={18} /></>
            ) : (
              <>Register Identity <UserPlus size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary/80 text-[10px] font-black uppercase tracking-[2px] transition-colors"
          >
            {isLogin ? "Need access? Request Credentials" : "Returning? Finalize Entry"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

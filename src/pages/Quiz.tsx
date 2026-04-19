import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, Question } from '../lib/data';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { Timer, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Trophy, RefreshCw, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';

export function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{questionId: string, correct: boolean}[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!category) return;
    // Shuffle questions
    const shuffled = [...category.questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [category]);

  useEffect(() => {
    if (questions.length === 0 || isFinished || isLocked) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext(true); // Auto-fail on timeout
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questions, currentIdx, isFinished, isLocked]);

  const handleAnswer = (index: number) => {
    if (isLocked) return;
    
    setSelectedAnswer(index);
    setIsLocked(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = index === questions[currentIdx].correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    
    setHistory(h => [...h, { questionId: questions[currentIdx].id, correct: isCorrect }]);

    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = (isTimeout = false) => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsFinished(true);
    if (user && category) {
      const quizResult = {
        userId: user.uid,
        category: category.name,
        score,
        total: questions.length,
        timestamp: new Date().toISOString()
      };

      // Save to scores collection
      await addDoc(collection(db, 'scores'), {
        ...quizResult,
        serverTimestamp: serverTimestamp()
      });

      // Update user stats
      const userRef = doc(db, 'users', user.uid);
      const newTotal = (userData?.totalQuizzes || 0) + 1;
      const newAvg = ((userData?.avgScore || 0) * (userData?.totalQuizzes || 0) + (score / questions.length)) / newTotal;

      await updateDoc(userRef, {
        totalQuizzes: newTotal,
        avgScore: newAvg,
        lastScore: `${score}/${questions.length}`,
        lastActivity: new Date().toISOString(),
        lastQuizzes: arrayUnion({
          category: category.name,
          score,
          total: questions.length,
          date: new Date().toISOString()
        })
      });
    }
  };

  if (!category) return <div>Category not found</div>;
  if (questions.length === 0) return null;

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    const feedback = percentage === 100 ? "You are a genius 🧠" : 
                    percentage >= 80 ? "Expert Level! 🏆" :
                    percentage >= 60 ? "Nice work! 🎓" :
                    percentage >= 40 ? "Keep studying... 📚" :
                    "Bro... you need help 😭";

    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="clean-card text-center max-w-lg w-full py-12 space-y-12"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Trophy className="text-primary" size={48} />
          </div>
          <div>
            <h2 className="text-4xl font-black mb-2 tracking-tight">Quiz Complete!</h2>
            <p className="text-text-dim font-medium uppercase tracking-[2px] text-xs underline decoration-primary underline-offset-4">{feedback}</p>
          </div>
          
          <div className="flex justify-center gap-12 py-4 border-y border-white/5 mx-8">
             <div>
               <div className="stat-value-gold text-4xl">{score}/{questions.length}</div>
               <div className="stat-label-dim">Final Score</div>
             </div>
             <div className="w-px h-12 bg-white/10"></div>
             <div>
               <div className="stat-value-gold text-4xl">{Math.round(percentage)}%</div>
               <div className="stat-label-dim">Accuracy</div>
             </div>
          </div>

          <div className="space-y-4 pt-4 px-10">
            <button 
              onClick={() => window.location.reload()}
              className="btn-minimal-filled w-full"
            >
              <RefreshCw size={18} /> Restart Domain
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-minimal w-full"
            >
              <BarChart size={18} /> View Statistics
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <BarChart className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
            <div className="flex items-center gap-3">
              <span className="stat-label-dim">Question {currentIdx + 1} of {questions.length}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-[10px] font-black uppercase text-text-dim tracking-wider">{category.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className={cn(
             "flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300",
             timeLeft <= 10 ? "border-red-500/50 text-red-500 bg-red-500/5" : "border-border-dim bg-card-bg/50 text-text-dim"
           )}>
              <Timer size={18} />
              <span className="font-mono text-xl font-bold leading-none">{timeLeft}</span>
           </div>
        </div>
      </div>

      {/* Progress Bar - Minimal */}
      <div className="progress-rail h-1.5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          className="progress-bar-fill shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        />
      </div>

      {/* Question Card - Clean Minimalism */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="clean-card p-12 space-y-12"
        >
          <h3 className="text-3xl font-light leading-snug tracking-tight">
            {currentQ.text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt, i) => {
              const outcome = isLocked ? (
                i === currentQ.correctAnswer ? 'correct' : (selectedAnswer === i ? 'wrong' : null)
              ) : null;

              return (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => handleAnswer(i)}
                  className={cn(
                    "group relative w-full text-left p-6 rounded-xl border transition-all duration-200 flex items-center justify-between",
                    !isLocked && "border-border-dim bg-bg-dark/50 hover:border-primary hover:bg-primary/5",
                    outcome === 'correct' && "border-green-500/50 bg-green-500/5 text-green-400",
                    outcome === 'wrong' && "border-red-500/50 bg-red-500/5 text-red-400",
                    isLocked && outcome === null && "opacity-30 grayscale"
                  )}
                >
                  <span className="text-lg font-medium tracking-tight">{opt}</span>
                  <div className="flex items-center gap-2">
                    {outcome === 'correct' && <CheckCircle2 size={24} className="text-green-500" />}
                    {outcome === 'wrong' && <XCircle size={24} className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center border-t border-white/5 pt-8">
        {timeLeft <= 5 && !isLocked && (
          <div className="flex items-center gap-2 text-red-500/50 text-[10px] font-black uppercase tracking-[2px] animate-pulse">
            <AlertTriangle size={14} /> Critical: Time Depleting
          </div>
        )}
      </div>
    </div>
  );
}

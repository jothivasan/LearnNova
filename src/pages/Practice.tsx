import { useStore } from "@/store/useStore";
import { useState } from "react";
import { Lock, CheckSquare, XSquare, ArrowRight, RotateCcw, PlusSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export function Practice() {
  const { currentDay, plannerDays, questions, topics } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const todayPlan = plannerDays.find(d => d.dayNumber === currentDay);
  const todayTopic = topics.find(t => t.id === todayPlan?.topicId);
  
  if (!todayPlan || !todayTopic) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 border-2 border-dashed border-border m-4 p-10">
        <div className="w-24 h-24 bg-dark flex items-center justify-center border border-border shadow-[4px_4px_0_var(--color-accent)] relative z-10">
          <Zap className="w-12 h-12 text-accent animate-pulse fill-current" />
        </div>
        <div className="font-display text-text text-sm tracking-widest uppercase font-bold bg-dark p-6 border border-border text-center max-w-lg shadow-[4px_4px_0_var(--color-border)]">
          No learning plan detected. Initialize new plan to access simulation modules.
        </div>
        <Link to="/create-plan" className="px-10 py-5 bg-accent text-dark font-display font-bold text-lg tracking-widest uppercase brutal-shadow hover:bg-white transition-all flex items-center gap-4">
          <PlusSquare className="w-6 h-6" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  const todayQuestions = questions.filter(q => q.topicId === todayTopic.id);

  if (!todayPlan.practiceUnlocked) {
    return (
      <div className="max-w-3xl mx-auto mt-32 text-center space-y-10 border-2 border-danger p-16 bg-dark brutal-shadow">
        <div className="w-32 h-32 bg-danger flex items-center justify-center mx-auto border-2 border-dark shadow-[8px_8px_0_var(--color-text)]">
          <Lock className="w-16 h-16 text-dark fill-current" />
        </div>
        <div>
          <h2 className="font-display text-6xl font-black text-text uppercase tracking-tighter mix-blend-difference">Access Denied</h2>
          <p className="text-text-muted mt-4 font-display tracking-widest text-sm uppercase font-bold border-l-4 border-danger inline-block pl-4">
            Theory module incomplete. Simulation locked.
          </p>
        </div>
        <Link 
          to="/planner" 
          className="inline-flex items-center gap-4 px-10 py-5 bg-surface border-2 border-border text-text font-display font-bold text-lg tracking-widest uppercase hover:bg-danger hover:text-dark hover:border-danger transition-all brutal-shadow"
        >
          Return to Planner
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    );
  }

  if (todayQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-32 text-center space-y-8 glass-panel border-2 border-border p-12 bg-surface brutal-shadow">
        <h2 className="font-display text-6xl font-black text-text uppercase">No Data Found</h2>
        <p className="text-text-muted font-display tracking-widest text-sm uppercase font-bold">
          Simulation parameters are empty for this module.
        </p>
      </div>
    );
  }

  const currentQuestion = todayQuestions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < todayQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const accuracy = Math.round((score / todayQuestions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto mt-12"
      >
        <div className="glass-panel p-8 md:p-10 border border-accent bg-dark brutal-shadow-sm text-center">
          <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6 border-2 border-dark shadow-[4px_4px_0_var(--color-text)]">
            <Zap className="w-8 h-8 text-dark fill-current" />
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold text-text mb-3 leading-none uppercase tracking-tight">
            Simulation<br/><span className="text-transparent text-stroke-accent">Terminated</span>
          </h2>
          <p className="text-text-muted font-display tracking-widest text-xs uppercase font-bold mb-8 border-b border-border inline-block pb-2">Results compiled for Day {currentDay}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
            <div className="bg-surface border border-border p-6 brutal-shadow-sm">
              <p className="text-[10px] font-display tracking-widest text-text-muted uppercase font-bold mb-3 border-l-2 border-accent pl-2">Final Score</p>
              <p className="font-display text-5xl md:text-6xl font-bold text-text">{score}<span className="text-2xl text-text-muted">/{todayQuestions.length}</span></p>
            </div>
            <div className={`bg-surface border border-border p-6 brutal-shadow-sm relative overflow-hidden`}>
              <div className={`absolute bottom-0 left-0 w-full h-1.5 ${accuracy >= 70 ? 'bg-success' : accuracy >= 50 ? 'bg-accent' : 'bg-danger'}`}></div>
              <p className="text-[10px] font-display tracking-widest text-text-muted uppercase font-bold mb-3 border-l-2 border-border pl-2">Accuracy Rating</p>
              <p className={`font-display text-5xl md:text-6xl font-bold ${accuracy >= 70 ? 'text-success' : accuracy >= 50 ? 'text-accent' : 'text-danger'}`}>
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-dark border border-border text-text font-display font-bold text-xs tracking-widest uppercase hover:border-accent hover:text-accent transition-all brutal-shadow-sm"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              Re-Run
            </button>
            <button 
              onClick={() => {
                useStore.getState().markDayCompleted(currentDay);
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-accent border border-dark text-dark font-display font-bold text-xs tracking-widest uppercase hover:bg-white transition-all brutal-shadow-sm"
            >
              Complete Day
              <CheckSquare className="w-5 h-5 shrink-0" />
            </button>
            <Link 
              to="/analytics"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-surface border border-border text-text font-display font-bold text-xs tracking-widest uppercase hover:bg-dark transition-all brutal-shadow-sm"
            >
              View Telemetry
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-border pb-6">
        <div>
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-3 inline-flex items-center gap-2 bg-dark border border-accent px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Module 02 // Simulation
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-tight">{todayTopic.name}</h1>
        </div>
        <div className="text-left md:text-right bg-dark border border-border p-3 w-full md:w-56 border-t-2 md:border-t md:border-r-2">
          <span className="font-display text-[10px] tracking-widest text-text font-bold uppercase block mb-2">SEQ: {currentQuestionIndex + 1}/{todayQuestions.length}</span>
          <div className="w-full h-1.5 bg-surface overflow-hidden border border-border">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out" 
              style={{ width: `${((currentQuestionIndex + 1) / todayQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 md:p-10 relative border border-border bg-surface brutal-shadow-sm">
        <div className="absolute top-0 right-0 px-3 py-1.5 bg-dark border-b border-l border-border font-display text-[10px] tracking-widest text-accent uppercase font-bold">
          LVL: {currentQuestion.difficulty}
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-8 leading-tight uppercase tracking-tight mt-6">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let optionClass = "border-border text-text hover:border-accent hover:bg-dark bg-surface";
              let icon = null;

              if (isSubmitted) {
                if (isCorrect) {
                  optionClass = "border-success text-success bg-success/10 border-l-4";
                  icon = <CheckSquare className="w-5 h-5" />;
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-danger text-danger bg-danger/10 border-l-4";
                  icon = <XSquare className="w-5 h-5" />;
                } else {
                  optionClass = "border-border text-text-muted/50 bg-dark opacity-50";
                }
              } else if (isSelected) {
                optionClass = "border-accent text-accent bg-dark border-l-4";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 border transition-all text-left font-sans text-base font-medium group gap-4 sm:gap-0 ${optionClass} ${!isSubmitted && isSelected ? 'brutal-shadow-sm translate-x-1.5' : ''}`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-display text-[10px] font-bold tracking-widest uppercase shrink-0 mt-1 sm:mt-0 opacity-70">OPT {idx + 1}</span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                  <div className="self-end sm:self-auto shrink-0">
                    {icon}
                  </div>
                </button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex justify-end">
          {!isSubmitted ? (
            <button
              disabled={!selectedAnswer}
              onClick={handleSubmit}
              className="px-8 py-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed brutal-shadow-sm disabled:shadow-none"
            >
              Commit Data
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-8 py-4 bg-dark border border-border text-text font-display font-bold text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all brutal-shadow-sm"
            >
              {currentQuestionIndex < todayQuestions.length - 1 ? 'Next Sequence' : 'End Simulation'}
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "motion/react";
import { Play, Clock, CheckSquare, XSquare, ArrowRight, RotateCcw, AlertCircle, PlusSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Tests() {
  const { questions, plannerDays } = useStore();
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // If no plan is active
  if (plannerDays.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
        <div className="w-16 h-16 bg-dark flex items-center justify-center border border-accent brutal-shadow-sm">
          <Zap className="w-8 h-8 text-accent animate-pulse" />
        </div>
        <div className="text-text-muted font-display text-xs font-bold tracking-widest uppercase border border-border bg-surface p-6 text-center max-w-md brutal-shadow-sm">
          No learning plan detected. Initialize a plan to generate mock tests.
        </div>
        <Link to="/create-plan" className="px-6 py-3 bg-accent text-dark font-display font-bold text-xs tracking-widest uppercase hover:bg-dark hover:text-accent border border-transparent hover:border-accent transition-all brutal-shadow-sm flex items-center gap-2">
          <PlusSquare className="w-4 h-4" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  // If no questions are available
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
        <div className="w-16 h-16 bg-dark flex items-center justify-center border border-danger brutal-shadow-sm shadow-[4px_4px_0_var(--color-danger)]">
          <AlertCircle className="w-8 h-8 text-danger animate-pulse" />
        </div>
        <div className="text-text font-display text-xs font-bold tracking-widest uppercase border border-border bg-surface p-6 text-center max-w-lg brutal-shadow-sm">
          Insufficient data to generate a mock test. Complete more theory modules or add questions to the database.
        </div>
      </div>
    );
  }

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testActive && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testActive && !isFinished) {
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [testActive, isFinished, timeLeft]);

  const startTest = () => {
    setTestActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(questions.length * 60); // 1 minute per question
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!testActive) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-10 pb-16"
      >
        <div className="border-b border-border pb-8">
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-3 bg-dark inline-flex items-center gap-2 border border-accent px-3 py-1.5">
            <Zap className="w-3.5 h-3.5" />
            Module 03 // Mock Exam Simulator
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text leading-none uppercase tracking-tight">
            Combat<br/><span className="text-transparent text-stroke-accent">Readiness</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border bg-surface p-6 brutal-shadow-sm relative">
            <h3 className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3 mt-1">Total Questions</h3>
            <p className="font-display text-4xl font-bold text-text leading-none">{questions.length}</p>
          </div>
          <div className="border border-border bg-surface p-6 brutal-shadow-sm relative">
            <h3 className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3 mt-1">Time Limit</h3>
            <p className="font-display text-4xl font-bold text-text leading-none">{questions.length} <span className="text-xl text-text-muted font-bold">MIN</span></p>
          </div>
          <div className="border border-border bg-surface p-6 brutal-shadow-sm relative">
            <h3 className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3 mt-1">Passing Threshold</h3>
            <p className="font-display text-4xl font-bold text-accent leading-none">70%</p>
          </div>
        </div>

        <div className="border border-border bg-surface p-8 relative overflow-hidden group brutal-shadow-sm">
          <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-text uppercase tracking-tight mb-3 group-hover:text-dark transition-colors">Initialize Full Simulation</h2>
              <p className="font-sans text-sm text-text-muted leading-relaxed max-w-2xl group-hover:text-dark/80 transition-colors">
                This will test your knowledge across all learned modules. The timer cannot be paused once started. Ensure operational readiness.
              </p>
            </div>
            <button 
              onClick={startTest}
              className="shrink-0 flex items-center gap-2 px-6 py-4 bg-dark border border-text text-text font-display font-bold text-xs tracking-widest uppercase hover:bg-text hover:text-dark transition-all brutal-shadow-sm self-start md:self-auto group-hover:border-dark"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Simulation
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isFinished) {
    const accuracy = Math.round((score / questions.length) * 100);
    const passed = accuracy >= 70;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto mt-12 pb-16"
      >
        <div className="border border-border bg-surface p-10 relative overflow-hidden text-center brutal-shadow-sm">
          <div className={`absolute top-0 left-0 w-full h-2 ${passed ? 'bg-success' : 'bg-danger'}`}></div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold text-text mb-4 leading-none tracking-tight uppercase mt-2">
            Simulation<br/>
            <span className={passed ? 'text-transparent text-stroke-success' : 'text-transparent text-stroke-danger'}>
              Terminated
            </span>
          </h2>
          <p className="font-display font-bold text-text-muted tracking-widest text-[10px] uppercase mb-12 border-b border-border pb-6 inline-block px-10">
            {passed ? 'Threshold met. Clearance granted.' : 'Threshold failed. Remedial training required.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-dark border border-border p-6 text-left brutal-shadow-sm relative overflow-hidden">
              <p className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-4 z-10 relative">Final Score</p>
              <p className="font-display text-5xl font-bold text-text leading-none z-10 relative">{score}<span className="text-2xl text-text-muted tracking-wider">/{questions.length}</span></p>
            </div>
            <div className={`bg-dark border ${passed ? 'border-success' : 'border-danger'} p-6 text-left brutal-shadow-sm relative overflow-hidden`}>
              <div className={`absolute bottom-0 left-0 w-full h-1.5 ${passed ? 'bg-success' : 'bg-danger'}`}></div>
              <p className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-4 z-10 relative">Accuracy Rating</p>
              <p className={`font-display text-5xl font-bold leading-none z-10 relative ${passed ? 'text-success' : 'text-danger'}`}>
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setTestActive(false)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-dark border border-border text-text font-display font-bold text-xs tracking-widest uppercase hover:border-text transition-all brutal-shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Return to Menu
            </button>
            <Link 
              to="/analytics"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-accent text-dark border border-transparent font-display font-bold text-xs tracking-widest uppercase hover:bg-dark hover:text-accent hover:border-accent transition-all brutal-shadow-sm"
            >
              View Telemetry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 gap-6">
        <div>
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-3 bg-dark inline-flex items-center gap-2 border border-accent px-3 py-1.5">
            <Zap className="w-3 h-3" />
            Mock Exam // In Progress
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-tight leading-none">
            Question <span className="text-transparent text-stroke-text">{currentQuestionIndex + 1}</span>
          </h1>
        </div>
        <div className="flex flex-col md:items-end gap-2 w-full md:w-auto mt-2 md:mt-0">
          <div className={`flex items-center gap-3 px-5 py-2.5 border ${timeLeft < 60 ? 'border-danger text-danger bg-danger/10 animate-pulse' : 'border-accent text-accent bg-dark brutal-shadow-sm'}`}>
            <Clock className="w-5 h-5" />
            <span className="font-display text-2xl font-bold tracking-widest leading-none">{formatTime(timeLeft)}</span>
          </div>
          <div className="font-display text-[10px] tracking-widest text-text font-bold uppercase bg-surface border border-border px-3 py-1.5 text-center">
            SEQ: {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
      </div>

      <div className="border border-border bg-surface p-6 md:p-10 relative brutal-shadow-sm">
        <div className="absolute top-0 right-0 bg-dark border-b border-l border-border px-4 py-1.5 font-display text-[10px] tracking-widest text-text-muted uppercase font-bold">
          LVL: <span className="text-text">{currentQuestion.difficulty}</span>
        </div>
        
        <h2 className="font-display text-2xl md:text-4xl font-bold text-text mb-10 leading-tight mt-4 tracking-tight">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let optionClass = "border-border text-text-muted hover:border-text hover:text-text bg-dark";
              let icon = null;

              if (isSubmitted) {
                if (isCorrect) {
                  optionClass = "border-success text-success bg-success/10";
                  icon = <CheckSquare className="w-5 h-5" />;
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-danger text-danger bg-danger/10";
                  icon = <XSquare className="w-5 h-5" />;
                } else {
                  optionClass = "border-border/30 text-text-muted/50 bg-surface/50 opacity-60";
                }
              } else if (isSelected) {
                optionClass = "border-accent text-accent bg-accent/5 shadow-[2px_2px_0_var(--color-accent)] -translate-y-[2px]";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 border transition-all duration-200 text-left group gap-4 md:gap-6 ${optionClass}`}
                >
                  <div className="flex items-start sm:items-center gap-4 md:gap-6">
                    <span className="font-display text-[8px] md:text-[10px] font-bold tracking-widest uppercase border border-current px-1.5 py-0.5 shrink-0 mt-1 sm:mt-0">
                      O_{idx + 1}
                    </span>
                    <span className="font-sans text-base md:text-lg font-medium leading-relaxed">{option}</span>
                  </div>
                  <div className="self-end sm:self-auto shrink-0 transition-transform group-hover:scale-110">
                    {icon}
                  </div>
                </button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex justify-end">
          {!isSubmitted ? (
            <button
              disabled={!selectedAnswer}
              onClick={handleSubmit}
              className="px-8 py-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase border border-transparent hover:bg-dark hover:text-accent hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed brutal-shadow-sm disabled:shadow-none disabled:hover:translate-y-0 hover:-translate-y-0.5"
            >
              Commit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-8 py-4 bg-dark border border-text text-text font-display font-bold text-sm tracking-widest uppercase hover:bg-text hover:text-dark transition-all brutal-shadow-sm"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Sequence' : 'End Simulation'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

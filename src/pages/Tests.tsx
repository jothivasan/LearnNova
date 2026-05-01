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
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shadow-sm">
          <Zap className="w-8 h-8 text-accent animate-pulse" />
        </div>
        <div className="text-text-muted font-sans font-medium text-sm text-center max-w-md bg-surface border border-border/50 rounded-xl p-6 shadow-sm">
          No learning plan detected. Initialize a plan to generate mock tests.
        </div>
        <Link to="/create-plan" className="px-6 py-3 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center gap-2">
          <PlusSquare className="w-5 h-5" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  // If no questions are available
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center shadow-sm">
          <AlertCircle className="w-8 h-8 text-danger animate-pulse" />
        </div>
        <div className="text-text font-sans font-medium text-sm text-center max-w-lg bg-surface border border-border/50 rounded-xl p-6 shadow-sm">
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
          <p className="font-sans font-medium text-accent bg-accent/10 rounded-full inline-flex items-center gap-2 px-4 py-1.5 text-sm mb-4 border border-accent/20">
            <Zap className="w-4 h-4" />
            Module 03 // Mock Exam Simulator
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text leading-none tracking-tight">
            Combat<br/><span className="text-accent">Readiness</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative">
            <h3 className="font-sans text-sm font-semibold text-text-muted mb-3 mt-1">Total Questions</h3>
            <p className="font-display text-4xl font-bold text-text leading-none">{questions.length}</p>
          </div>
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative">
            <h3 className="font-sans text-sm font-semibold text-text-muted mb-3 mt-1">Time Limit</h3>
            <p className="font-display text-4xl font-bold text-text leading-none">{questions.length} <span className="text-xl text-text-muted font-bold font-sans">MIN</span></p>
          </div>
          <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative">
            <h3 className="font-sans text-sm font-semibold text-text-muted mb-3 mt-1">Passing Threshold</h3>
            <p className="font-display text-4xl font-bold text-accent leading-none">70%</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-text tracking-tight mb-3">Initialize Full Simulation</h2>
              <p className="font-sans text-sm text-text-muted leading-relaxed max-w-2xl">
                This will test your knowledge across all learned modules. The timer cannot be paused once started. Ensure operational readiness.
              </p>
            </div>
            <button 
              onClick={startTest}
              className="shrink-0 flex items-center gap-3 px-8 py-4 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 focus:ring-4 focus:ring-accent/20 self-start md:self-auto"
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
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-10 relative overflow-hidden text-center">
          <div className={`absolute top-0 left-0 w-full h-1 ${passed ? 'bg-success' : 'bg-danger'}`}></div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold text-text mb-4 leading-none tracking-tight mt-2">
            Simulation<br/>
            <span className={passed ? 'text-success' : 'text-danger'}>
              Terminated
            </span>
          </h2>
          <p className="font-sans font-medium text-text-muted text-sm mb-12 border-b border-border/50 pb-6 inline-block px-10">
            {passed ? 'Threshold met. Clearance granted.' : 'Threshold failed. Remedial training required.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-surface-light rounded-xl border border-border/50 p-6 text-left shadow-sm relative overflow-hidden">
              <p className="font-sans text-sm font-medium text-text-muted mb-4 z-10 relative">Final Score</p>
              <p className="font-display text-5xl font-bold text-text leading-none z-10 relative">{score}<span className="text-2xl text-text-muted font-sans font-medium">/{questions.length}</span></p>
            </div>
            <div className={`bg-surface-light rounded-xl border ${passed ? 'border-success/50' : 'border-danger/50'} p-6 text-left shadow-sm relative overflow-hidden`}>
              <div className={`absolute bottom-0 left-0 w-full h-1 ${passed ? 'bg-success' : 'bg-danger'}`}></div>
              <p className="font-sans text-sm font-medium text-text-muted mb-4 z-10 relative">Accuracy Rating</p>
              <p className={`font-display text-5xl font-bold leading-none z-10 relative ${passed ? 'text-success' : 'text-danger'}`}>
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setTestActive(false)}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-surface-light border border-border rounded-xl text-text font-medium text-sm hover:bg-border/50 transition-colors shadow-sm"
            >
              <RotateCcw className="w-5 h-5" />
              Return to Menu
            </button>
            <Link 
              to="/analytics"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-accent text-white rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all font-medium text-sm"
            >
              View Telemetry
              <ArrowRight className="w-5 h-5" />
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
          <p className="font-sans font-medium text-accent bg-accent/10 rounded-full inline-flex items-center gap-2 px-4 py-1.5 text-sm mb-4 border border-accent/20">
            <Zap className="w-4 h-4" />
            Mock Exam // In Progress
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text tracking-tight leading-none">
            Question <span className="text-accent">{currentQuestionIndex + 1}</span>
          </h1>
        </div>
        <div className="flex flex-col md:items-end gap-2 w-full md:w-auto mt-2 md:mt-0">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${timeLeft < 60 ? 'border-danger text-danger bg-danger/10 animate-pulse' : 'border-border/50 text-accent bg-surface-light shadow-sm'}`}>
            <Clock className="w-5 h-5" />
            <span className="font-display text-2xl font-bold leading-none">{formatTime(timeLeft)}</span>
          </div>
          <div className="font-sans text-xs font-semibold text-text bg-surface-light border border-border/50 rounded-lg px-3 py-1.5 text-center shadow-sm">
            SEQ: {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 md:p-10 relative">
        <div className="absolute top-0 right-0 bg-surface-light border-b border-l border-border/50 rounded-bl-xl px-4 py-2 font-sans text-xs font-semibold text-text-muted">
          LVL: <span className="text-text">{currentQuestion.difficulty}</span>
        </div>
        
        <h2 className="font-display text-2xl md:text-4xl font-bold text-text mb-10 leading-tight mt-4 tracking-tight">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let optionClass = "border-border/50 text-text-muted hover:border-accent/50 hover:bg-surface-light/50 bg-surface-light";
              let icon = null;

              if (isSubmitted) {
                if (isCorrect) {
                  optionClass = "border-success/50 text-success bg-success/10 ring-2 ring-success/20";
                  icon = <CheckSquare className="w-6 h-6" />;
                } else if (isSelected && !isCorrect) {
                  optionClass = "border-danger/50 text-danger bg-danger/10 ring-2 ring-danger/20";
                  icon = <XSquare className="w-6 h-6" />;
                } else {
                  optionClass = "border-border/20 text-text-muted/40 bg-surface-light/30 opacity-60";
                }
              } else if (isSelected) {
                optionClass = "border-accent text-accent bg-accent/10 ring-2 ring-accent/20 shadow-md shadow-accent/5 -translate-y-[2px]";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 rounded-xl border transition-all duration-300 text-left group gap-4 md:gap-6 ${optionClass}`}
                >
                  <div className="flex items-start sm:items-center gap-4 md:gap-6">
                    <span className="font-sans text-xs font-bold text-inherit border border-current rounded-md px-2 py-1 shrink-0 mt-1 sm:mt-0 opacity-80">
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
              className="px-8 py-4 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5"
            >
              Commit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-8 py-4 bg-surface-light border border-border rounded-xl text-text font-medium text-sm hover:bg-border/50 transition-colors shadow-sm"
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

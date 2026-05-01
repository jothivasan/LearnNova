import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { Play, Pause, Square, Clock, ArrowRight, PlusSquare, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function StudySession() {
  const { currentDay, plannerDays, topics, updateStudyDuration } = useStore();
  const navigate = useNavigate();
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);

  const todayPlan = plannerDays.find(d => d.dayNumber === currentDay);
  const todayTopic = topics.find(t => t.id === todayPlan?.topicId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  if (!todayPlan || !todayTopic) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shadow-sm">
          <Zap className="w-8 h-8 text-accent animate-pulse" />
        </div>
        <div className="text-text font-sans font-medium text-sm text-center max-w-lg bg-surface border border-border/50 rounded-xl p-6 shadow-sm">
          No learning plan detected. Initialize a plan to start a study session.
        </div>
        <Link to="/create-plan" className="px-6 py-3 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center gap-2">
          <PlusSquare className="w-5 h-5" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setSessionEnded(true);
    // Convert seconds to minutes and update store
    const minutes = Math.round(seconds / 60);
    if (minutes > 0) {
      updateStudyDuration(currentDay, minutes);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (sessionEnded) {
    const minutes = Math.round(seconds / 60);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto mt-12 pb-16"
      >
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold text-text mb-4 leading-none tracking-tight mt-2">Session<br/><span className="text-accent">Terminated</span></h2>
          <p className="font-sans font-medium text-text-muted text-sm mb-10 border-b border-border/50 pb-6 inline-block px-8">Time logged to central database</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-surface-light rounded-xl border border-border/50 p-6 shadow-sm relative">
              <p className="font-sans text-sm font-medium text-text-muted mb-3">Duration</p>
              <p className="font-display text-5xl font-bold text-accent leading-none">{formatTime(seconds)}</p>
            </div>
            <div className="bg-surface-light rounded-xl border border-border/50 p-6 shadow-sm relative">
              <p className="font-sans text-sm font-medium text-text-muted mb-3">Time Logged</p>
              <p className="font-display text-5xl font-bold leading-none">{minutes} <span className="text-xl text-text-muted font-sans font-medium">MIN</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-surface border border-border rounded-xl text-text font-medium text-sm hover:bg-surface-light transition-colors shadow-sm"
            >
              Return To Dashboard
            </Link>
            <Link 
              to="/analytics"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all font-medium text-sm"
            >
              View Telemetry
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-16"
    >
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-sans font-medium text-accent bg-accent/10 rounded-full inline-block px-4 py-1.5 text-sm mb-4 border border-accent/20">
            SYS.EXECUTE // ACTIVE_SESSION
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-text leading-none tracking-tight">
            Deep<br/><span className="text-accent">Work</span>
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 bg-surface-light rounded-xl p-4 border border-border w-full md:w-auto mt-4 md:mt-0 shadow-sm">
          <span className="font-sans text-sm font-medium text-text-muted">DAY: <span className="text-text font-semibold">{currentDay}</span></span>
          <span className="font-sans text-sm font-medium text-text-muted">TOPIC: <span className="text-accent font-semibold">{todayTopic.name}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface rounded-2xl shadow-xl border border-border p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-80 group transition-all duration-300 hover:border-accent/50">
          <div className="absolute inset-0 bg-surface-light opacity-80 z-0"></div>
          
          <div className="relative z-10 text-center space-y-10 w-full">
            <div className="inline-flex items-center justify-center">
              <div className={`font-display text-6xl md:text-8xl font-bold tracking-tight transition-colors ${isActive && !isPaused ? 'text-accent' : 'text-text'}`}>
                {formatTime(seconds)}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {!isActive ? (
                <button 
                  onClick={handleStart}
                  className="flex items-center justify-center gap-3 px-10 py-4 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Initialize
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button 
                      onClick={handleResume}
                      className="flex items-center justify-center gap-2 px-6 py-4 border border-accent/20 bg-accent/10 rounded-xl text-accent font-medium text-sm hover:bg-accent/20 transition-all flex-1 sm:flex-none"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      Resume
                    </button>
                  ) : (
                    <button 
                      onClick={handlePause}
                      className="flex items-center justify-center gap-2 px-6 py-4 border border-border bg-surface-light rounded-xl text-text font-medium text-sm hover:bg-border/50 transition-all flex-1 sm:flex-none shadow-sm"
                    >
                      <Pause className="w-5 h-5 fill-current" />
                      Pause
                    </button>
                  )}
                  <button 
                    onClick={handleStop}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-danger text-white border border-transparent font-medium text-sm rounded-xl hover:bg-danger/90 transition-all shadow-lg shadow-danger/25 flex-1 sm:flex-none"
                  >
                    <Square className="w-5 h-5 fill-current" />
                    Terminate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm relative flex-1">
            <h3 className="font-sans text-sm font-semibold text-accent mb-6 flex items-center gap-2 border-l-2 border-accent pl-2">
              <Clock className="w-4 h-4" />
              Session Parameters
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="font-sans text-sm font-medium text-text-muted">Target Time</span>
                <span className="font-display font-semibold text-lg text-accent">{todayTopic.estimatedTime} MIN</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="font-sans text-sm font-medium text-text-muted">Current Log</span>
                <span className="font-display font-semibold text-lg text-text">{todayPlan.studyDuration} MIN</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm relative flex-1">
            <h3 className="font-sans text-sm font-semibold text-text mb-6 border-l-2 border-border pl-2">Execution Steps</h3>
            <div className="space-y-4">
              {todayPlan.dailyTasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-surface-light border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors shadow-sm">
                    <span className="font-sans text-[10px] font-bold text-text-muted group-hover:text-accent transition-colors">{i + 1}</span>
                  </div>
                  <span className="font-sans text-xs tracking-wide text-text/80 leading-relaxed mt-1">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

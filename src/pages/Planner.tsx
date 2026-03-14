import { useStore } from "@/store/useStore";
import { CheckSquare, Clock, Calendar as CalendarIcon, ArrowRight, Lock, PlusSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Planner() {
  const { plannerDays, topics, currentDay } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
        <div className="relative">
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-2 bg-dark inline-block border border-accent px-2.5 py-1">
            Curriculum Timeline
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-text leading-none uppercase tracking-tight">
            Study<br/><span className="text-transparent text-stroke-accent">Planner</span>
          </h1>
        </div>
        <Link to="/create-plan" className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-text font-display font-medium text-[10px] tracking-widest uppercase hover:text-dark hover:bg-accent transition-all brutal-shadow-sm">
          <PlusSquare className="w-4 h-4" />
          Initialize Plan
        </Link>
      </div>

      <div className="glass-panel overflow-hidden border border-border bg-surface brutal-shadow-sm">
        {plannerDays.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 p-5 relative border border-dashed border-border m-3">
            <div className="w-12 h-12 bg-dark flex items-center justify-center border border-border mt-2 relative z-10 transition-transform">
              <Zap className="w-6 h-6 text-accent animate-pulse fill-current" />
            </div>
            <p className="text-text font-serif text-sm italic text-center max-w-sm relative z-10">
              System requires a learning directive to proceed. Initialize a new plan to begin tracking.
            </p>
            <Link to="/create-plan" className="px-5 py-2.5 bg-accent text-dark font-display font-bold text-[10px] tracking-widest uppercase brutal-shadow-sm hover:bg-white transition-all relative z-10">
              Chart Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 divide-y divide-border">
            {plannerDays.map((day, i) => {
              const topic = topics.find(t => t.id === day.topicId);
              const isToday = day.dayNumber === currentDay;
              const isPast = day.dayNumber < currentDay;
              
              let statusColor = "text-text-muted border-border";
              let statusIcon = <Clock className="w-4 h-4" />;
              
              if (day.completionStatus === 'Completed') {
                statusColor = "text-success border-success bg-success/10";
                statusIcon = <CheckSquare className="w-4 h-4" />;
              } else if (day.completionStatus === 'InProgress') {
                statusColor = "text-accent border-accent bg-accent/10";
                statusIcon = <Clock className="w-4 h-4" />;
              }

              return (
                <motion.div 
                  key={day.dayNumber} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center transition-all duration-300 relative group ${isToday ? 'bg-dark border-y border-accent' : 'hover:bg-dark'}`}
                >
                  {isToday && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent shadow-[2px_0_0_rgba(204,255,0,0.5)]"></div>
                  )}
                  
                  <div className={`shrink-0 w-16 h-16 border flex flex-col items-center justify-center transition-all duration-500 ${isToday ? 'border-accent bg-accent text-dark shadow-[3px_3px_0_var(--color-border)]' : 'border-border bg-surface group-hover:border-accent'}`}>
                    <span className="font-display text-[8px] font-bold uppercase tracking-widest block mb-0.5">Phase</span>
                    <span className={`font-display text-xl font-bold leading-none ${isToday ? 'text-dark' : 'text-text'}`}>
                      {String(day.dayNumber).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`font-display text-lg md:text-xl font-bold truncate uppercase tracking-tight ${isPast ? 'text-text-muted' : 'text-text group-hover:text-accent transition-colors'}`}>
                        {topic?.name}
                      </h3>
                      {isToday && (
                        <span className="px-2 py-1 bg-accent border border-dark text-dark font-display text-[8px] font-bold tracking-widest uppercase">
                          Active Node
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 font-display text-[8px] font-bold tracking-widest uppercase border ${statusColor}`}>
                        {statusIcon}
                        {day.completionStatus}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-wide">
                      <span className="flex items-center gap-1.5 bg-dark px-2.5 py-1 border border-border font-display text-[8px] uppercase tracking-widest text-text">
                        <Clock className="w-3 h-3 text-accent" />
                        Est {topic?.estimatedTime}m
                      </span>
                      <span className="flex items-center gap-1.5 bg-dark px-2.5 py-1 border border-border font-display text-[8px] uppercase tracking-widest text-text">
                        <CalendarIcon className="w-3 h-3 text-accent" />
                        {day.plannedTimeline}
                      </span>
                      <span className="px-2.5 py-1 border border-border bg-dark font-display text-[8px] uppercase tracking-widest text-text">
                        Lvl {topic?.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 w-full lg:w-40 mt-3 lg:mt-0">
                    {isToday ? (
                      <Link 
                        to="/theory"
                        className="flex items-center justify-between lg:justify-center gap-2 px-4 py-2.5 bg-accent text-dark font-display font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-all brutal-shadow-sm w-full"
                      >
                        Execute Phase
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button 
                        disabled={isPast}
                        className={`flex items-center justify-between lg:justify-center gap-2 px-4 py-2.5 border font-display font-bold text-[10px] tracking-widest uppercase transition-all w-full ${
                          isPast 
                            ? 'border-border text-text-muted cursor-not-allowed bg-dark' 
                            : 'border-border text-text hover:border-accent hover:bg-accent hover:text-dark bg-surface shadow-[2px_2px_0_var(--color-border)] hover:shadow-[2px_2px_0_var(--color-dark)]'
                        }`}
                      >
                        {isPast ? (
                          <>Seq Complete <CheckSquare className="w-4 h-4" /></>
                        ) : (
                          <>Locked State <Lock className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

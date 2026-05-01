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
          <p className="font-sans font-medium text-accent bg-accent/10 inline-block rounded-full px-3 py-1 text-sm mb-3">
            Curriculum Timeline
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-text leading-none tracking-tight">
            Study<br/><span className="text-accent">Planner</span>
          </h1>
        </div>
        <Link to="/create-plan" className="flex items-center gap-2 px-5 py-2.5 bg-surface-light border border-border rounded-xl text-text font-sans font-medium text-sm hover:bg-accent hover:border-accent hover:text-white transition-all shadow-sm">
          <PlusSquare className="w-5 h-5" />
          Initialize Plan
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-border">
        {plannerDays.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 p-5 relative border border-dashed border-border/50 rounded-xl m-4 bg-surface-light/50">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 mt-2 relative z-10">
              <Zap className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <p className="text-text font-sans text-sm text-center max-w-sm relative z-10 text-text-muted">
              System requires a learning directive to proceed. Initialize a new plan to begin tracking.
            </p>
            <Link to="/create-plan" className="px-6 py-2.5 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent/90 transition-all relative z-10 shadow-md shadow-accent/25">
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
                  className={`p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center transition-all duration-300 relative group hover:bg-surface-light/50 ${isToday ? 'bg-surface-light/80' : ''}`}
                >
                  {isToday && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full"></div>
                  )}
                  
                  <div className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 shadow-sm ${isToday ? 'bg-accent text-white' : 'border border-border bg-surface group-hover:border-accent/50'}`}>
                    <span className="font-sans text-[10px] font-medium block mb-0.5 opacity-80">Phase</span>
                    <span className={`font-display text-xl font-bold leading-none ${isToday ? 'text-white' : 'text-text'}`}>
                      {String(day.dayNumber).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className={`font-display text-lg md:text-xl font-semibold truncate ${isPast ? 'text-text-muted' : 'text-text group-hover:text-accent transition-colors'}`}>
                        {topic?.name}
                      </h3>
                      {isToday && (
                        <span className="px-2.5 py-1 rounded-md bg-accent/20 text-accent font-sans text-xs font-semibold">
                          Active Node
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-sans text-xs font-semibold border ${statusColor}`}>
                        {statusIcon}
                        {day.completionStatus}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5 bg-surface rounded-lg px-2.5 py-1.5 border border-border/50 font-sans shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        Est {topic?.estimatedTime}m
                      </span>
                      <span className="flex items-center gap-1.5 bg-surface rounded-lg px-2.5 py-1.5 border border-border/50 font-sans shadow-sm">
                        <CalendarIcon className="w-3.5 h-3.5 text-accent" />
                        {day.plannedTimeline}
                      </span>
                      <span className="px-2.5 py-1.5 rounded-lg border border-border/50 bg-surface font-sans shadow-sm">
                        Lvl {topic?.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 w-full lg:w-40 mt-3 lg:mt-0">
                    {isToday ? (
                      <Link 
                        to="/session"
                        className="flex items-center justify-between lg:justify-center gap-2 px-4 py-3 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 w-full"
                      >
                        Start Practice
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button 
                        disabled={isPast}
                        className={`flex items-center justify-between lg:justify-center gap-2 px-4 py-3 border font-medium text-sm rounded-xl transition-all w-full shadow-sm ${
                          isPast 
                            ? 'border-border/50 text-text-muted cursor-not-allowed bg-surface-light/50' 
                            : 'border-border text-text hover:border-accent hover:bg-accent/10 hover:text-accent bg-surface'
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

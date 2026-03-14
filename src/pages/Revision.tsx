import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckSquare, RotateCcw, PlusSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Revision() {
  const { topics, plannerDays } = useStore();
  
  const weakTopics = topics.filter(t => t.masteryStatus === 'NeedRevision');

  if (plannerDays.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
        <div className="w-12 h-12 bg-dark flex items-center justify-center border border-accent brutal-shadow-sm">
          <Zap className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <div className="text-text-muted font-display text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-border bg-surface p-4 text-center max-w-sm brutal-shadow-sm">
          No learning plan detected. Initialize a plan to access the revision module.
        </div>
        <Link to="/create-plan" className="px-6 py-2.5 bg-accent text-dark font-display font-black text-[10px] tracking-widest uppercase hover:bg-dark hover:text-accent border border-transparent hover:border-accent transition-all brutal-shadow-sm flex items-center gap-2">
          <PlusSquare className="w-4 h-4" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6 pb-12"
    >
      <div className="border-b border-border pb-4">
        <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-2 bg-dark border border-accent px-3 py-1.5 flex items-center gap-2 w-max brutal-shadow-sm">
          <Zap className="w-3.5 h-3.5" />
          Module 04 // Revision Tracker
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-text uppercase leading-none tracking-tight">
          Knowledge<br/><span className="text-transparent text-stroke-accent">Reinforcement</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border bg-surface p-5 relative group hover:border-danger transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-danger scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-dark flex items-center justify-center border border-danger shadow-[2px_2px_0_var(--color-danger)]">
              <AlertCircle className="w-4 h-4 text-danger" />
            </div>
            <span className="font-display text-[8px] sm:text-[10px] tracking-widest text-danger bg-dark px-2 py-1 border border-danger font-bold uppercase">
              CRITICAL
            </span>
          </div>
          <p className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1">Needs Revision</p>
          <p className="font-display text-4xl sm:text-5xl font-black text-danger">{weakTopics.length}</p>
        </div>

        <div className="border border-border bg-surface p-5 relative group hover:border-success transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-success scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-dark flex items-center justify-center border border-success shadow-[2px_2px_0_var(--color-success)]">
              <CheckSquare className="w-4 h-4 text-success" />
            </div>
            <span className="font-display text-[8px] sm:text-[10px] tracking-widest text-success bg-dark px-2 py-1 border border-success font-bold uppercase">
              OPTIMAL
            </span>
          </div>
          <p className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1">Mastered</p>
          <p className="font-display text-4xl sm:text-5xl font-black text-success">{topics.filter(t => t.masteryStatus === 'Learned').length}</p>
        </div>

        <div className="border border-border bg-surface p-5 relative group hover:border-accent transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-dark flex items-center justify-center border border-accent shadow-[2px_2px_0_var(--color-accent)]">
              <RotateCcw className="w-4 h-4 text-accent" />
            </div>
            <span className="font-display text-[8px] sm:text-[10px] tracking-widest text-text-muted bg-dark px-2 py-1 border border-border font-bold uppercase">
              PENDING
            </span>
          </div>
          <p className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase mb-1">Not Started</p>
          <p className="font-display text-4xl sm:text-5xl font-black text-text">{topics.filter(t => t.masteryStatus === 'NotStarted').length}</p>
        </div>
      </div>

      <div className="border border-border bg-surface overflow-hidden brutal-shadow-sm">
        <div className="p-4 sm:p-5 border-b border-border bg-dark flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="font-display text-[10px] sm:text-xs font-black text-danger uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Critical Sectors // Action Required
          </h2>
          <span className="font-display text-[8px] sm:text-[10px] font-bold tracking-widest text-text-muted uppercase px-2 py-1 border border-border bg-surface">{weakTopics.length} MODULES</span>
        </div>
        <div className="divide-y divide-border">
          {weakTopics.length > 0 ? weakTopics.map(topic => (
            <div key={topic.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-dark transition-colors group">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h3 className="font-display text-lg sm:text-xl font-black text-text uppercase tracking-tight">{topic.name}</h3>
                  <span className="px-2 py-1 border border-border text-[8px] font-bold tracking-widest text-text-muted uppercase bg-dark w-max">
                    LVL: {topic.difficulty}
                  </span>
                </div>
                <p className="font-sans text-[10px] sm:text-xs text-text-muted leading-relaxed max-w-2xl border-l-2 border-border pl-3">Accuracy below threshold in recent simulations. Recommended action: Review theory and re-simulate.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-3 md:mt-0">
                <Link to="/theory" className="px-5 py-2.5 bg-dark border border-border text-text font-display font-bold text-[8px] sm:text-[10px] tracking-widest uppercase hover:border-text hover:text-dark hover:bg-text transition-all text-center brutal-shadow-sm">
                  Review Theory
                </Link>
                <Link to="/practice" className="px-5 py-2.5 bg-accent text-dark font-display font-black text-[8px] sm:text-[10px] tracking-widest uppercase hover:bg-dark hover:text-accent border border-transparent hover:border-accent transition-all flex items-center justify-center gap-2 brutal-shadow-sm">
                  Init Simulation
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )) : (
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5">
              <div className="w-14 h-14 bg-dark flex items-center justify-center border border-success shadow-[3px_3px_0_var(--color-success)]">
                <CheckSquare className="w-6 h-6 text-success" />
              </div>
              <p className="text-text font-display text-[10px] sm:text-sm font-black tracking-widest uppercase max-w-lg leading-relaxed">
                All sectors operating within optimal parameters. No critical revisions required.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckSquare, RotateCcw, PlusSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Revision() {
  const { topics, plannerDays } = useStore();
  
  const weakTopics = topics.filter(t => t.masteryStatus === 'NeedRevision');

    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-sm">
          <Zap className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <div className="text-text-muted font-sans font-medium text-sm text-center max-w-sm bg-surface border border-border/50 rounded-xl p-4 shadow-sm">
          No learning plan detected. Initialize a plan to access the revision module.
        </div>
        <Link to="/create-plan" className="px-6 py-3 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center gap-2">
          <PlusSquare className="w-5 h-5" />
          Initialize Directive
        </Link>
      </div>
    );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6 pb-12"
    >
      <div className="border-b border-border pb-4">
        <p className="font-sans font-medium text-accent bg-accent/10 rounded-full inline-flex items-center gap-2 px-4 py-1.5 text-sm mb-4 border border-accent/20 w-max">
          <Zap className="w-4 h-4" />
          Module 04 // Revision Tracker
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-text leading-none tracking-tight">
          Knowledge<br/><span className="text-accent">Reinforcement</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative group hover:border-danger/50 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-danger scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center shadow-sm">
              <AlertCircle className="w-5 h-5 text-danger" />
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold text-danger bg-danger/5 px-3 py-1 border border-danger/20 rounded-md">
              CRITICAL
            </span>
          </div>
          <p className="font-sans text-xs font-semibold text-text-muted mb-1">Needs Revision</p>
          <p className="font-display text-4xl sm:text-5xl font-bold text-danger">{weakTopics.length}</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative group hover:border-success/50 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-success scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shadow-sm">
              <CheckSquare className="w-5 h-5 text-success" />
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold text-success bg-success/5 px-3 py-1 border border-success/20 rounded-md">
              OPTIMAL
            </span>
          </div>
          <p className="font-sans text-xs font-semibold text-text-muted mb-1">Mastered</p>
          <p className="font-display text-4xl sm:text-5xl font-bold text-success">{topics.filter(t => t.masteryStatus === 'Learned').length}</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 relative group hover:border-text/50 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-text scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center shadow-sm border border-border/50">
              <RotateCcw className="w-5 h-5 text-text-muted group-hover:text-text transition-colors" />
            </div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold text-text-muted bg-surface-light px-3 py-1 border border-border/50 rounded-md">
              PENDING
            </span>
          </div>
          <p className="font-sans text-xs font-semibold text-text-muted mb-1">Not Started</p>
          <p className="font-display text-4xl sm:text-5xl font-bold text-text">{topics.filter(t => t.masteryStatus === 'NotStarted').length}</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="p-5 sm:p-6 border-b border-border/50 bg-surface-light flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-sans text-sm sm:text-base font-semibold text-danger flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Critical Sectors // Action Required
          </h2>
          <span className="font-sans text-xs font-semibold text-text-muted bg-surface border border-border/50 rounded-lg px-3 py-1.5 shadow-sm">{weakTopics.length} MODULES</span>
        </div>
        <div className="divide-y divide-border/50">
          {weakTopics.length > 0 ? weakTopics.map(topic => (
            <div key={topic.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-light/50 transition-colors group">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-text tracking-tight">{topic.name}</h3>
                  <span className="px-2.5 py-1 rounded-md border border-border/50 text-xs font-semibold text-text-muted bg-surface-light w-max">
                    LVL: {topic.difficulty}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl border-l-2 border-danger/30 pl-3">Accuracy below threshold in recent simulations. Recommended action: Review theory and re-simulate.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-4 md:mt-0">
                <Link to="/planner" className="px-6 py-3 bg-surface-light border border-border/50 rounded-xl text-text font-medium text-sm hover:bg-surface-light/80 hover:border-text/30 transition-all text-center shadow-sm">
                  Review Plan
                </Link>
                <Link to="/practice" className="px-6 py-3 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25">
                  Start Practice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )) : (
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5 bg-surface-light/30">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center border border-success/20 shadow-sm">
                <CheckSquare className="w-8 h-8 text-success" />
              </div>
              <p className="text-text font-sans text-sm sm:text-base font-medium max-w-lg leading-relaxed text-text-muted">
                All sectors operating within optimal parameters. No critical revisions required.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

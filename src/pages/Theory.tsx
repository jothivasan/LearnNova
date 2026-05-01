import { useStore } from "@/store/useStore";
import { Play, FileText, ExternalLink, ArrowRight, CheckSquare, PlusSquare, Zap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

export function Theory() {
  const { currentDay, plannerDays, topics, markTheoryCompleted } = useStore();
  const navigate = useNavigate();
  
  const todayPlan = plannerDays.find(d => d.dayNumber === currentDay);
  const todayTopic = topics.find(t => t.id === todayPlan?.topicId);

  if (!todayPlan || !todayTopic) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 bg-surface-light/50 border border-dashed border-border/50 rounded-3xl m-4 p-10">
        <div className="w-24 h-24 rounded-3xl bg-accent/10 flex items-center justify-center relative z-10 shadow-sm border border-accent/20">
          <Zap className="w-12 h-12 text-accent animate-pulse" />
        </div>
        <div className="font-sans text-text font-medium text-sm bg-surface border border-border/50 rounded-xl p-6 text-center max-w-lg shadow-sm">
          No learning plan detected for current cycle. Initialize a new plan to access theory modules.
        </div>
        <Link to="/create-plan" className="px-8 py-4 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center gap-3">
          <PlusSquare className="w-5 h-5" />
          Initialize Directive
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    markTheoryCompleted(currentDay);
    navigate('/practice');
  };

  return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-10 pb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="font-sans font-medium text-accent bg-accent/10 rounded-full inline-flex items-center gap-2 px-4 py-1.5 text-sm mb-4 border border-accent/20">
              <Zap className="w-4 h-4" />
              Module 01 // Theory Acquisition
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-text leading-tight tracking-tight">
              {todayTopic.name}
            </h1>
          </div>
          <div className="flex flex-row flex-wrap md:flex-col items-center md:items-end gap-3">
            <span className="font-sans text-xs font-semibold text-text bg-surface-light border border-border/50 rounded-lg px-4 py-2 shadow-sm">EST TIME: {todayTopic.estimatedTime}M</span>
            <span className="font-sans text-xs font-semibold text-text bg-surface-light border border-border/50 rounded-lg px-4 py-2 shadow-sm">LVL: {todayTopic.difficulty}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-border relative group cursor-pointer transition-all hover:border-accent/50">
              <div className="absolute top-4 left-4 z-10 bg-surface border border-border/50 rounded-lg px-3 py-1.5 font-sans text-[10px] font-bold tracking-widest text-white backdrop-blur-sm bg-dark/50 shadow-sm">
                REC // 00:00:00
              </div>
              <div className="aspect-video bg-surface-light relative flex items-center justify-center overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyber/800/450')] bg-cover bg-center opacity-60 mix-blend-overlay group-hover:scale-105 transition-all duration-700 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
                <div className="w-20 h-20 rounded-full bg-accent/90 backdrop-blur flex items-center justify-center z-20 group-hover:scale-110 group-hover:bg-accent transition-all duration-300 shadow-xl shadow-accent/30">
                  <Play className="w-8 h-8 text-white ml-1.5 fill-current" />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold text-text mb-3 tracking-tight">Core Data Stream</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed max-w-2xl border-l-2 border-accent pl-4">
                  Initialize cognitive upload. This module covers the fundamental architecture of {todayTopic.name}. 
                  Process this data thoroughly before attempting the simulation phase.
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl shadow-xl p-6 md:p-8 border border-border">
              <h3 className="font-sans text-lg font-semibold text-accent mb-6 flex items-center gap-3 border-b border-border/50 pb-4">
                <FileText className="w-5 h-5" />
                Extracted Notes
              </h3>
              <div className="space-y-4">
                {todayPlan.dailyTasks.map((task, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl border border-border/50 bg-surface-light hover:border-accent/50 transition-colors group shadow-sm">
                    <span className="text-accent font-sans text-xl font-bold group-hover:scale-110 transition-transform shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm text-text/90 leading-relaxed pt-1">{task}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface rounded-2xl shadow-xl p-6 border border-border">
              <h3 className="font-sans text-lg font-semibold text-text mb-5 border-b border-border/50 pb-4">External Links</h3>
              <ul className="space-y-3">
                {['Official Documentation', 'Interactive Sandbox', 'Architecture Diagram'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-surface-light hover:border-accent/50 hover:bg-accent/5 transition-all group font-sans text-sm font-medium text-text shadow-sm">
                      <span className="truncate">{link}</span>
                      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0 ml-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface rounded-2xl shadow-xl p-6 relative overflow-hidden border border-border">
              <h3 className="font-sans text-lg font-semibold text-accent mb-4 relative z-10">Status Check</h3>
              <p className="font-sans text-sm text-text-muted mb-8 leading-relaxed relative z-10 border-l-2 border-accent/70 pl-3">
                Acknowledge data reception to unlock simulation protocols.
              </p>
              
              {todayPlan.theoryCompleted ? (
                <button 
                  onClick={() => navigate('/practice')}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all shadow-md shadow-accent/20 relative z-10"
                >
                  Init Simulation
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleComplete}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-accent text-accent font-medium text-sm hover:bg-accent hover:text-white transition-all shadow-sm relative z-10"
                >
                  Acknowledge Sync
                  <CheckSquare className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
  );
}

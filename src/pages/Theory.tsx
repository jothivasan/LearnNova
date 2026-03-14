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
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 border-2 border-dashed border-border m-4 p-10">
        <div className="w-24 h-24 bg-dark flex items-center justify-center border border-border shadow-[4px_4px_0_var(--color-accent)] relative z-10">
          <Zap className="w-12 h-12 text-accent animate-pulse fill-current" />
        </div>
        <div className="font-display text-text text-sm tracking-widest uppercase font-bold bg-dark p-6 border border-border text-center max-w-lg shadow-[4px_4px_0_var(--color-border)]">
          No learning plan detected for current cycle. Initialize a new plan to access theory modules.
        </div>
        <Link to="/create-plan" className="px-10 py-5 bg-accent text-dark font-display font-bold text-lg tracking-widest uppercase brutal-shadow hover:bg-white transition-all flex items-center gap-4">
          <PlusSquare className="w-6 h-6" />
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
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-3 inline-flex items-center gap-2 bg-dark border border-accent px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Module 01 // Theory Acquisition
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text leading-tight uppercase tracking-tight">
            {todayTopic.name}
          </h1>
        </div>
        <div className="flex flex-row flex-wrap md:flex-col items-center md:items-end gap-2">
          <span className="font-display text-xs tracking-widest text-text font-bold bg-dark px-3 py-1.5 border border-border">EST TIME: {todayTopic.estimatedTime}M</span>
          <span className="font-display text-xs tracking-widest text-text font-bold bg-dark px-3 py-1.5 border border-border">LVL: {todayTopic.difficulty}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel relative group cursor-pointer overflow-hidden border border-border brutal-shadow-sm bg-surface">
            <div className="absolute top-4 left-4 z-10 bg-dark px-3 py-1.5 border border-accent font-display text-[10px] tracking-widest text-accent font-bold uppercase shadow-[2px_2px_0_var(--color-border)]">
              REC // 00:00:00
            </div>
            <div className="aspect-video bg-dark relative flex items-center justify-center overflow-hidden border-b border-border">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyber/800/450')] bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-dark/60"></div>
              <div className="w-16 h-16 bg-accent flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300 border border-dark brutal-shadow-sm">
                <Play className="w-8 h-8 text-dark ml-1.5 fill-current" />
              </div>
            </div>
            <div className="p-6 md:p-8 bg-surface">
              <h3 className="font-display text-3xl font-bold text-text mb-3 uppercase tracking-tight">Core Data Stream</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed max-w-2xl border-l-2 border-accent pl-3">
                Initialize cognitive upload. This module covers the fundamental architecture of {todayTopic.name}. 
                Process this data thoroughly before attempting the simulation phase.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 border border-border bg-surface brutal-shadow-sm">
            <h3 className="font-display text-xl font-bold text-accent uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-border pb-3">
              <FileText className="w-5 h-5" />
              Extracted Notes
            </h3>
            <div className="space-y-3">
              {todayPlan.dailyTasks.map((task, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border bg-dark hover:border-accent transition-colors group">
                  <span className="text-accent font-display text-2xl font-bold group-hover:scale-110 transition-transform shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-sans text-sm text-text leading-relaxed pt-1">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-6 border border-border bg-surface brutal-shadow-sm">
            <h3 className="font-display text-lg font-bold text-text uppercase tracking-widest mb-5 border-b border-border pb-3">External Links</h3>
            <ul className="space-y-3">
              {['Official Documentation', 'Interactive Sandbox', 'Architecture Diagram'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center justify-between p-4 border border-border bg-dark hover:border-accent hover:bg-accent hover:text-dark transition-all group font-display text-xs font-bold uppercase tracking-widest text-text">
                    <span className="truncate">{link}</span>
                    <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-dark transition-colors shrink-0 ml-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 relative overflow-hidden border border-accent bg-dark brutal-shadow-sm">
            <h3 className="font-display text-xl font-bold text-accent uppercase tracking-widest mb-3 relative z-10">Status Check</h3>
            <p className="font-sans text-xs text-text-muted mb-6 leading-relaxed relative z-10 border-l-2 border-accent pl-2">
              Acknowledge data reception to unlock simulation protocols.
            </p>
            
            {todayPlan.theoryCompleted ? (
              <button 
                onClick={() => navigate('/practice')}
                className="w-full flex items-center justify-between p-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase hover:bg-white transition-all brutal-shadow-sm relative z-10"
              >
                Init Simulation
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                className="w-full flex items-center justify-between p-4 border border-accent text-accent font-display font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-dark transition-all relative z-10"
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

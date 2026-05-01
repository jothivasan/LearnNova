import { useStore } from "@/store/useStore";
import { Target, Clock, CheckSquare, Activity, ArrowRight, Play, PlusSquare, X, Download, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const studyData = [
  { name: "D1", hours: 1.5 },
  { name: "D2", hours: 2.0 },
  { name: "D3", hours: 0.5 },
  { name: "D4", hours: 0 },
  { name: "D5", hours: 0 },
];

export function Dashboard() {
  const { plannerDays, currentDay, totalStudyHours, topics } = useStore();
  const [showCertificate, setShowCertificate] = useState(false);
  
  const completedDays = plannerDays.filter(d => d.completionStatus === 'Completed').length;
  const totalDays = plannerDays.length;
  const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  
  const todayPlan = plannerDays.find(d => d.dayNumber === currentDay);
  const todayTopic = topics.find(t => t.id === todayPlan?.topicId);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="relative">
            <motion.h1 variants={itemVariants} className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-text">
              Welcome back,<br/>
              <span className="text-accent">let's master this.</span>
            </motion.h1>
            <motion.div variants={itemVariants} className="mt-4 flex items-center gap-3">
              <span className="bg-accent/10 text-accent px-3 py-1 font-medium text-xs rounded-full">
                Status
              </span>
              <p className="text-text-muted font-sans text-sm">
                {totalDays > 0 ? `Phase ${currentDay} of ${totalDays}` : 'No plan active'}
              </p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {progressPercentage === 100 ? (
              <button onClick={() => setShowCertificate(true)} className="px-6 py-3.5 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                <Award className="w-5 h-5" />
                Claim Certificate
              </button>
            ) : (
              <>
                <Link to="/create-plan" className="px-6 py-3.5 bg-surface border border-border text-sm font-medium rounded-xl hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  <PlusSquare className="w-5 h-5 text-text-muted" />
                  New Plan
                </Link>
                <Link to={totalDays === 0 ? "#" : "/session"} className={`px-6 py-3.5 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${totalDays === 0 ? 'opacity-50 cursor-not-allowed hidden' : 'hover:bg-accent/90'}`}>
                  <Play className="w-4 h-4 fill-current" />
                  Continue Learning
                </Link>
              </>
            )}
          </motion.div>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Overall Progress", value: `${progressPercentage}%`, icon: Target, sub: `${completedDays} of ${totalDays} steps` },
          { label: "Time Logged", value: `${totalStudyHours.toFixed(1)}h`, icon: Clock, sub: "+2.5h this week" },
          { label: "Topics Mastered", value: topics.filter(t => t.masteryStatus === 'Learned').length, icon: CheckSquare, sub: `Out of ${topics.length} total` },
          { label: "Learning Streak", value: "3 Days", icon: Activity, sub: "Keep it up!" }
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-panel p-6 relative overflow-hidden group hover:border-accent/50 transition-all duration-300">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-all duration-300 group-hover:scale-110">
              <stat.icon className="w-24 h-24 text-accent" />
            </div>
            <p className="font-sans font-medium text-sm text-text-muted mb-3">{stat.label}</p>
            <h3 className="font-display text-3xl font-semibold text-text mb-1 tracking-tight">{stat.value}</h3>
            <p className="font-sans text-xs text-text-muted/70">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Plan */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6 md:p-8 relative overflow-hidden">
          {totalDays === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-5 relative z-10 border border-dashed border-border/50 rounded-2xl m-2 bg-surface-light/30">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-text-muted font-sans text-sm">No active learning plan yet.</div>
              <Link to="/create-plan" className="px-6 py-3 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all">
                Create your first plan
              </Link>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 pb-4">
                <h2 className="font-sans text-sm font-medium text-text-muted">Today's Focus <span className="text-border px-2">|</span> Phase {currentDay}</h2>
                <span className="px-3 py-1 rounded-full border border-accent/20 text-accent font-medium text-xs bg-accent/5">
                  {todayPlan?.plannedTimeline || 'Flexible flow'}
                </span>
              </div>
              
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-text leading-tight mb-4 tracking-tight">
                  {todayTopic?.name || 'Unknown Topic'}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="font-sans text-xs text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20">
                    {todayTopic?.estimatedTime || 0} mins
                  </span>
                  <span className="font-sans text-xs text-text-muted bg-surface-light px-3 py-1.5 rounded-lg border border-border">
                    Level: {todayTopic?.difficulty || 'N/A'}
                  </span>
                </div>

                <div className="mt-8">
                  <h4 className="font-sans text-sm font-medium text-text-muted mb-4">Checklist</h4>
                  <div className="space-y-2">
                    {todayPlan?.dailyTasks?.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-border hover:bg-surface-light transition-colors">
                        <div className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center font-sans text-xs text-text-muted shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="font-sans text-sm text-text/90 leading-relaxed pt-0.5">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Link to="/session" className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-border bg-surface hover:border-accent hover:shadow-sm transition-all group">
                    <span className="font-sans text-sm font-medium text-text group-hover:text-accent transition-colors">Study</span>
                  </Link>
                  <Link to="/practice" className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border transition-all group ${!todayPlan?.practiceUnlocked ? 'border-border/50 opacity-50 cursor-not-allowed bg-surface/50' : 'border-border bg-surface hover:border-accent hover:shadow-sm'}`}>
                    <span className="font-sans text-sm font-medium text-text group-hover:text-accent transition-colors">Practice</span>
                  </Link>
                  <Link to="/tests" className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-border bg-surface hover:border-accent hover:shadow-sm transition-all group">
                    <span className="font-sans text-sm font-medium text-text group-hover:text-accent transition-colors">Test</span>
                  </Link>
                  <Link to="/session" className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all">
                    <span className="font-sans font-medium text-sm transition-colors">Start Now</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Charts & Analytics */}
        <motion.div variants={itemVariants} className="space-y-6 md:space-y-6">
          <div className="glass-panel p-6 bg-surface border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans text-sm font-medium text-text-muted">Activity</h2>
            </div>
            <div className="h-40 mt-2 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'var(--color-accent)', fontWeight: 500 }}
                    cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="var(--color-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Link to="/leaderboard" className="glass-panel p-6 bg-surface border border-border flex items-center justify-between group hover:border-accent transition-all duration-300 cursor-pointer">
            <div>
              <h2 className="font-sans text-sm font-medium text-text-muted mb-2">Current Streak</h2>
              <div className="flex items-baseline gap-2">
                <p className="font-display text-4xl font-semibold text-text group-hover:text-accent transition-colors tracking-tight">{useStore().currentStreak}</p>
                <p className="font-sans text-sm text-text-muted">Days</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-light border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>

    <AnimatePresence>
      {showCertificate && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text hover:bg-border transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative z-10 text-center p-12">
              <div className="inline-flex p-5 rounded-full bg-accent/10 text-accent mb-6">
                <Award className="w-12 h-12" />
              </div>
              
              <div className="space-y-4 mb-10">
                <p className="font-sans font-semibold text-sm text-accent uppercase tracking-wider">Certificate of Completion</p>
                <h2 className="font-display text-4xl font-bold text-text leading-tight tracking-tight">
                  Learning Plan<br/>Accomplished
                </h2>
              </div>
              
              <div className="py-8 border-y border-border/50 space-y-4 bg-surface-light/30 rounded-xl">
                <p className="font-sans text-sm text-text-muted">This certifies that</p>
                <p className="font-display text-3xl font-semibold text-text">Jane Doe</p>
                <p className="font-sans text-sm text-text-muted">has successfully completed</p>
                <p className="font-display text-xl font-medium text-accent">{topics[0]?.name || 'Learning'} Plan</p>
              </div>
              
              <div className="pt-10 flex justify-center">
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="px-8 py-3.5 bg-accent text-white font-medium text-sm rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all flex items-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

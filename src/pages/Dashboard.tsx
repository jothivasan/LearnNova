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
            <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none text-text uppercase">
              Elevate<br/>
              <span className="text-accent">Mastery</span>
            </motion.h1>
            <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
              <span className="bg-text text-dark px-2.5 py-1 font-display text-xs tracking-widest uppercase">
                System Status
              </span>
              <p className="text-text font-serif text-xl italic">
                {totalDays > 0 ? `Executing Phase ${currentDay}/${totalDays}` : 'Awaiting Initiation'}
              </p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {progressPercentage === 100 ? (
              <button onClick={() => setShowCertificate(true)} className="px-6 py-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase brutal-shadow hover:bg-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                <Award className="w-5 h-5" />
                Claim Cert
              </button>
            ) : (
              <>
                <Link to="/create-plan" className="px-6 py-4 bg-surface border border-border text-sm font-display tracking-widest uppercase brutal-shadow-sm hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  <PlusSquare className="w-5 h-5" />
                  New Plan
                </Link>
                <Link to={totalDays === 0 ? "#" : "/session"} className={`px-6 py-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase brutal-shadow transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${totalDays === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}>
                  <Play className="w-5 h-5 fill-current" />
                  Execute
                </Link>
              </>
            )}
          </motion.div>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Progress", value: `${progressPercentage}%`, icon: Target, sub: `${completedDays}/${totalDays} Cycles` },
          { label: "Time Logged", value: `${totalStudyHours.toFixed(1)}h`, icon: Clock, sub: "+2.5h Delta" },
          { label: "Nodes Cleared", value: topics.filter(t => t.masteryStatus === 'Learned').length, icon: CheckSquare, sub: `Of ${topics.length} Total` },
          { label: "Stability", value: "75%", icon: Activity, sub: "Nominal" }
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-panel p-6 relative overflow-hidden group hover:border-accent transition-all duration-300 brutal-shadow-sm bg-surface">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-all duration-300 group-hover:scale-110">
              <stat.icon className="w-24 h-24 text-accent" />
            </div>
            <p className="font-display text-xs tracking-widest text-text-muted mb-4 uppercase block border-b border-border pb-2">{stat.label}</p>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-text mb-1 tracking-tight">{stat.value}</h3>
            <p className="font-serif text-base italic text-accent">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Plan */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6 md:p-8 relative overflow-hidden brutal-shadow bg-surface">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
          
          {totalDays === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-6 relative z-10 border border-dashed border-border m-2">
              <div className="w-16 h-16 bg-dark flex items-center justify-center border border-border mb-2">
                <Zap className="w-8 h-8 text-accent animate-pulse fill-current" />
              </div>
              <div className="text-text font-serif text-2xl italic">No active journey detected.</div>
              <Link to="/create-plan" className="px-8 py-4 bg-accent text-dark font-display font-bold text-sm tracking-widest uppercase brutal-shadow hover:bg-white transition-all">
                Chart Course
              </Link>
            </div>
          ) : (
            <div className="relative z-10 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 border-b border-border pb-3">
                <h2 className="font-display text-xs tracking-widest text-text-muted uppercase">Active Directive // Phase {currentDay}</h2>
                <span className="px-3 py-1.5 border border-accent text-accent font-display text-[10px] tracking-widest uppercase bg-accent/5">
                  {todayPlan?.plannedTimeline || 'Flexible'}
                </span>
              </div>
              
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight mb-4 uppercase tracking-tight">
                  {todayTopic?.name || 'Unknown Protocol'}
                </h3>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="font-display text-[10px] tracking-widest text-dark border border-accent px-3 py-1.5 bg-accent uppercase">
                    Est: {todayTopic?.estimatedTime || 0}m
                  </span>
                  <span className="font-display text-[10px] tracking-widest text-text border border-border px-3 py-1.5 bg-dark uppercase">
                    Lvl: {todayTopic?.difficulty || 'N/A'}
                  </span>
                </div>

                <div className="mt-8">
                  <h4 className="font-display text-sm tracking-widest text-text uppercase border-b border-border pb-3 mb-4">Execution Steps</h4>
                  <div className="space-y-3">
                    {todayPlan?.dailyTasks?.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-4 group p-3 border border-border bg-dark hover:border-accent transition-colors">
                        <div className="w-6 h-6 bg-surface border border-border flex items-center justify-center font-display text-xs group-hover:bg-accent group-hover:text-dark group-hover:border-accent transition-colors shrink-0">
                          0{idx + 1}
                        </div>
                        <span className="font-sans text-base text-text/80 group-hover:text-text transition-colors leading-relaxed pt-0.5">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link to="/session" className="flex flex-col items-center justify-center gap-4 p-6 glass-panel border border-border hover:border-accent hover:bg-dark transition-all group brutal-shadow-sm">
                    <span className="font-display text-sm tracking-widest text-text-muted group-hover:text-accent">01</span>
                    <span className="font-display text-sm md:text-base tracking-wide uppercase mt-1">Session</span>
                  </Link>
                  <Link to="/practice" className={`flex flex-col items-center justify-center gap-3 p-4 md:p-5 glass-panel border brutal-shadow-sm transition-all group ${!todayPlan?.practiceUnlocked ? 'border-border opacity-50 cursor-not-allowed bg-dark' : 'border-border hover:border-accent hover:bg-dark'}`}>
                    <span className="font-display text-xs tracking-widest text-text-muted group-hover:text-accent">02</span>
                    <span className="font-display text-sm md:text-base tracking-wide uppercase mt-1">Practice</span>
                  </Link>
                  <Link to="/tests" className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 glass-panel border border-border hover:border-accent hover:bg-dark transition-all group brutal-shadow-sm">
                    <span className="font-display text-xs tracking-widest text-text-muted group-hover:text-accent">03</span>
                    <span className="font-display text-sm md:text-base tracking-wide uppercase mt-1">Simulate</span>
                  </Link>
                  <Link to="/session" className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 glass-panel bg-accent text-dark border border-accent hover:bg-white transition-all brutal-shadow">
                    <Play className="w-6 h-6 fill-current" />
                    <span className="font-display font-bold text-sm md:text-base tracking-wide uppercase mt-1">Execute</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Charts & Analytics */}
        <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
          <div className="glass-panel p-6 bg-surface border border-border brutal-shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-border pb-3">
              <h2 className="font-display text-xs tracking-widest text-text-muted uppercase">Output Telemetry</h2>
              <div className="w-8 h-8 border border-border flex items-center justify-center bg-dark">
                <Activity className="w-4 h-4 text-accent" />
              </div>
            </div>
            <div className="h-40 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--color-border)" opacity={0.8} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-dark)', border: '1px solid var(--color-border)', borderRadius: '0px', fontFamily: 'var(--font-display)', fontSize: '11px', color: '#f5ece5', textTransform: 'uppercase', letterSpacing: '1px' }}
                    itemStyle={{ color: 'var(--color-accent)' }}
                    cursor={{ stroke: 'var(--color-accent)', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  <Area type="step" dataKey="hours" stroke="var(--color-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Link to="/leaderboard" className="glass-panel p-6 bg-surface border border-border flex items-center justify-between group hover:border-accent hover:bg-dark transition-all duration-300 cursor-pointer brutal-shadow">
            <div>
              <h2 className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-3 border-b border-border pb-2">Active Streak</h2>
              <div className="flex items-baseline gap-3">
                <p className="font-display text-5xl md:text-6xl font-bold text-accent tracking-tight">{useStore().currentStreak}</p>
                <p className="font-serif text-xl italic text-text-muted">Days</p>
              </div>
            </div>
            <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-dark transition-all duration-300">
              <ArrowRight className="w-6 h-6" />
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
            className="w-full max-w-4xl glass-panel p-10 md:p-16 relative overflow-hidden border-2 border-accent brutal-shadow bg-surface"
          >
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-dark flex items-center justify-center text-text-muted hover:text-dark hover:bg-accent transition-all border border-border z-20 brutal-shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 text-center space-y-12">
              <div className="inline-flex p-6 border-2 border-accent bg-dark brutal-shadow-sm">
                <Award className="w-16 h-16 text-accent" />
              </div>
              
              <div className="space-y-6">
                <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">Certificate of Mastery</p>
                <h2 className="font-display text-6xl md:text-8xl font-black text-text leading-none tracking-tighter uppercase">
                  Directive<br/>
                  <span className="text-transparent text-stroke-accent">Accomplished</span>
                </h2>
              </div>
              
              <div className="py-12 border-y-2 border-dashed border-border space-y-6 bg-dark/50">
                <p className="font-display text-xs tracking-[0.2em] text-text-muted uppercase">This certifies that</p>
                <p className="font-serif text-5xl italic text-text">Operative_01</p>
                <p className="font-display text-xs tracking-[0.2em] text-text-muted uppercase">has successfully completed</p>
                <p className="font-display text-3xl font-black text-accent uppercase tracking-widest">{topics[0]?.name || 'Learning'} Protocol</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end font-display text-xs tracking-widest text-text-muted gap-8 sm:gap-0 uppercase pt-4">
                <div className="text-left space-y-3">
                  <p>Date // <span className="text-text">{new Date().toLocaleDateString()}</span></p>
                  <p>Duration // <span className="text-accent">{totalStudyHours.toFixed(1)}h</span></p>
                </div>
                <div className="text-left sm:text-right space-y-3">
                  <p>ID // <span className="text-text">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
                  <p>Status // <span className="text-accent bg-accent/10 px-2 py-1 border border-accent">Verified</span></p>
                </div>
              </div>
              
              <div className="pt-10 flex justify-center">
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="px-12 py-6 bg-accent text-dark font-display font-bold text-lg tracking-widest uppercase brutal-shadow hover:bg-white transition-all flex items-center gap-4"
                >
                  <Download className="w-6 h-6" />
                  Download Record
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

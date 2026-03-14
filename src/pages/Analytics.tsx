import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { TrendingUp, Target, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const performanceData = [
  { day: "D01", accuracy: 85, target: 80 },
  { day: "D02", accuracy: 70, target: 80 },
  { day: "D03", accuracy: 90, target: 80 },
  { day: "D04", accuracy: 65, target: 80 },
  { day: "D05", accuracy: 80, target: 80 },
];

const timeData = [
  { topic: "React Basics", time: 120 },
  { topic: "Hooks", time: 180 },
  { topic: "Context", time: 90 },
  { topic: "Router", time: 60 },
];

export function Analytics() {
  const { topics, totalStudyHours } = useStore();
  
  const weakTopics = topics.filter(t => t.masteryStatus === 'NeedRevision');
  const masteredTopics = topics.filter(t => t.masteryStatus === 'Learned');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-16"
    >
      <div className="border-b border-border pb-6">
        <p className="font-display text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3 bg-dark inline-block border border-accent px-3 py-1.5">
          SYS_MONITOR // TELEMETRY
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-text uppercase leading-none tracking-tight">
          Performance<br/><span className="text-transparent text-stroke-accent">Analytics</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-accent transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6 text-accent" />
            <span className="font-display text-[10px] uppercase font-bold tracking-widest text-success border border-success px-2 py-1">
              +5%
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Avg_Accuracy</p>
          <p className="font-display text-4xl font-bold text-text">78%</p>
        </div>

        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-accent transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-6 h-6 text-accent" />
            <span className="font-display text-[10px] uppercase font-bold tracking-widest text-text border border-border bg-dark px-2 py-1">
              12_SESSIONS
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Total_Time</p>
          <p className="font-display text-4xl font-bold text-text">{totalStudyHours.toFixed(1)}h</p>
        </div>

        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-accent transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-6 h-6 text-accent" />
            <span className="font-display text-[10px] uppercase font-bold tracking-widest text-text border border-border bg-dark px-2 py-1">
              /{topics.length}_TOTAL
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Mastered</p>
          <p className="font-display text-4xl font-bold text-text">{masteredTopics.length}</p>
        </div>

        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-danger transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-danger scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-6 h-6 text-danger" />
            <span className="font-display text-[10px] uppercase font-bold tracking-widest text-danger border border-danger bg-danger/10 px-2 py-1">
              &lt;50%_ACC
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Needs_Revision</p>
          <p className="font-display text-4xl font-bold text-danger">{weakTopics.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="border-2 border-border bg-surface p-8 brutal-shadow">
          <h3 className="font-display text-sm font-black text-accent uppercase tracking-widest mb-8 border-l-4 border-accent pl-2">Accuracy_Trend</h3>
          <div className="h-64 sm:h-80 -ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="var(--color-border)" strokeWidth={2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', fontFamily: 'Bricolage Grotesque' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', fontFamily: 'Bricolage Grotesque' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-dark)', borderRadius: '0', border: '2px solid var(--color-border)', fontFamily: 'Bricolage Grotesque', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  cursor={{ stroke: 'var(--color-text-muted)', strokeWidth: 2, strokeDasharray: '4 4' }}
                  itemStyle={{ color: 'var(--color-accent)' }}
                />
                <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', fontFamily: 'Bricolage Grotesque', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text)' }} />
                <Line type="step" dataKey="accuracy" name="ACCURACY" stroke="var(--color-accent)" strokeWidth={4} dot={{ r: 0, fill: '#050505', strokeWidth: 0, stroke: 'var(--color-accent)' }} activeDot={{ r: 8, fill: 'var(--color-accent)', stroke: '#050505', strokeWidth: 2 }} />
                <Line type="step" dataKey="target" name="TARGET_80" stroke="var(--color-text-muted)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-2 border-border bg-surface p-8 brutal-shadow">
          <h3 className="font-display text-sm font-black text-accent uppercase tracking-widest mb-8 border-l-4 border-accent pl-2">Time_Allocation (MIN)</h3>
          <div className="h-64 sm:h-80 -ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="0" horizontal={false} stroke="var(--color-border)" strokeWidth={2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', fontFamily: 'Bricolage Grotesque' }} />
                <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', fontFamily: 'Bricolage Grotesque' }} width={90} />
                <Tooltip 
                  cursor={{ fill: 'rgba(204,255,0,0.1)' }}
                  contentStyle={{ backgroundColor: 'var(--color-dark)', borderRadius: '0', border: '2px solid var(--color-border)', fontFamily: 'Bricolage Grotesque', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  itemStyle={{ color: 'var(--color-accent)' }}
                />
                <Bar dataKey="time" fill="var(--color-accent)" radius={[0, 0, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border-2 border-border bg-surface overflow-hidden brutal-shadow">
        <div className="p-6 border-b-2 border-border bg-dark">
          <h2 className="font-display text-sm font-black text-danger uppercase tracking-widest">Critical_Sectors // Needs_Revision</h2>
        </div>
        <div className="divide-y-2 divide-border">
          {weakTopics.length > 0 ? weakTopics.map(topic => (
            <div key={topic.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-dark transition-colors group gap-4">
              <div>
                <h3 className="font-display text-2xl font-black text-text uppercase tracking-tight">{topic.name}</h3>
                <p className="font-sans text-sm text-text-muted mt-2">Accuracy below threshold in recent simulations</p>
              </div>
              <Link to="/revision" className="px-8 py-4 border-2 border-border bg-dark text-text font-display font-bold text-sm tracking-widest uppercase hover:border-accent hover:text-dark hover:bg-accent transition-all shrink-0 brutal-shadow-sm self-start sm:self-auto">
                Init_Review
              </Link>
            </div>
          )) : (
            <div className="p-12 text-center text-text font-display font-black text-2xl tracking-widest uppercase">
              All sectors operating within optimal parameters.
            </div>
          )}
        </div>
      </div>

      <div className="border-2 border-border bg-surface overflow-hidden brutal-shadow">
        <div className="p-6 border-b-2 border-border bg-dark">
          <h2 className="font-display text-sm font-black text-accent uppercase tracking-widest">Activity_Matrix // 30_DAYS</h2>
        </div>
        <div className="p-10 flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto pb-4">
            {Array.from({ length: 30 }).map((_, i) => {
              const intensity = Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0;
              return (
                <div 
                  key={i}
                  className={`w-6 h-6 md:w-8 md:h-8 border-2 border-dark transition-colors hover:border-accent shrink-0 ${
                    intensity === 0 ? 'bg-dark' :
                    intensity === 1 ? 'bg-accent/20' :
                    intensity === 2 ? 'bg-accent/50' :
                    intensity === 3 ? 'bg-accent/80' :
                    'bg-accent'
                  }`}
                  title={`Day ${30 - i}: ${intensity > 0 ? 'Active' : 'Inactive'}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between w-full mt-6 font-display text-xs font-bold text-text-muted tracking-widest uppercase max-w-3xl border-t-2 border-border pt-6">
            <span>30 Days Ago</span>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Less</span>
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-dark border-2 border-border"></div>
                <div className="w-4 h-4 bg-accent/20 border-2 border-dark"></div>
                <div className="w-4 h-4 bg-accent/50 border-2 border-dark"></div>
                <div className="w-4 h-4 bg-accent/80 border-2 border-dark"></div>
                <div className="w-4 h-4 bg-accent border-2 border-dark"></div>
              </div>
              <span className="hidden sm:inline">More</span>
            </div>
            <span>Today</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

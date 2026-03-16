import { motion } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Flame, 
  BarChart3, 
  CheckSquare,
  Zap,
  Shield
} from 'lucide-react';

// Mock admin data
const adminStats = {
  totalUsers: 1247,
  activeUsers: 832,
  averageStudyHours: 2.4,
  totalCompletedPlans: 156,
  averageStreak: 5.8,
  totalStudySessions: 8934,
  topStreakUser: 'CyberNinja',
  topStreakLength: 42,
};

const recentUsers = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', plan: 'React 30-Day', progress: 78, streak: 12, status: 'Active' },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', plan: 'Python ML 45-Day', progress: 45, streak: 7, status: 'Active' },
  { id: 3, name: 'Carol Singh', email: 'carol@example.com', plan: 'TypeScript 21-Day', progress: 100, streak: 0, status: 'Completed' },
  { id: 4, name: 'David Kim', email: 'david@example.com', plan: 'AWS Cert 60-Day', progress: 12, streak: 3, status: 'Active' },
  { id: 5, name: 'Eva Müller', email: 'eva@example.com', plan: 'DSA 30-Day', progress: 62, streak: 15, status: 'Active' },
  { id: 6, name: 'Frank Obi', email: 'frank@example.com', plan: 'React 30-Day', progress: 33, streak: 0, status: 'Inactive' },
];

const weeklyActivity = [
  { day: 'Mon', sessions: 142 },
  { day: 'Tue', sessions: 168 },
  { day: 'Wed', sessions: 155 },
  { day: 'Thu', sessions: 189 },
  { day: 'Fri', sessions: 134 },
  { day: 'Sat', sessions: 98 },
  { day: 'Sun', sessions: 76 },
];

export function AdminDashboard() {
  const maxSessions = Math.max(...weeklyActivity.map(d => d.sessions));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div className="border-b border-border pb-4">
        <p className="font-display text-[10px] font-bold text-accent uppercase tracking-widest mb-2 bg-dark border border-accent px-3 py-1.5 flex items-center gap-2 w-max brutal-shadow-sm">
          <Shield className="w-3.5 h-3.5" />
          Admin Dashboard
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-text uppercase leading-none tracking-tight">
          Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: 'accent' },
          { label: 'Active Learners', value: adminStats.activeUsers.toLocaleString(), icon: TrendingUp, color: 'success' },
          { label: 'Avg Study Hours', value: `${adminStats.averageStudyHours}h`, icon: Clock, color: 'accent' },
          { label: 'Completed Plans', value: adminStats.totalCompletedPlans.toString(), icon: CheckSquare, color: 'success' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-border bg-surface p-4 relative group hover:border-accent transition-colors brutal-shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 bg-dark flex items-center justify-center border border-${stat.color} shadow-[2px_2px_0_var(--color-${stat.color})]`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              </div>
            </div>
            <p className="font-display text-[9px] font-bold tracking-widest text-text-muted uppercase mb-1">{stat.label}</p>
            <p className="font-display text-2xl sm:text-3xl font-black text-text">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border bg-surface p-4 brutal-shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-danger" />
            <span className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase">Top Streak</span>
          </div>
          <p className="font-display text-2xl font-black text-danger">{adminStats.topStreakLength} days</p>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mt-1">by {adminStats.topStreakUser}</p>
        </div>

        <div className="border border-border bg-surface p-4 brutal-shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-accent" />
            <span className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase">Avg Streak</span>
          </div>
          <p className="font-display text-2xl font-black text-accent">{adminStats.averageStreak} days</p>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mt-1">across all users</p>
        </div>

        <div className="border border-border bg-surface p-4 brutal-shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-success" />
            <span className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase">Total Sessions</span>
          </div>
          <p className="font-display text-2xl font-black text-success">{adminStats.totalStudySessions.toLocaleString()}</p>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mt-1">study sessions logged</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="border border-border bg-surface p-5 brutal-shadow-sm">
        <div className="flex items-center gap-2 mb-5 border-b border-border pb-3">
          <BarChart3 className="w-4 h-4 text-accent" />
          <h2 className="font-display text-xs font-black text-text uppercase tracking-widest">Weekly Activity // Sessions</h2>
        </div>
        <div className="flex items-end gap-3 h-36">
          {weeklyActivity.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="font-display text-[9px] font-bold text-text-muted tracking-widest">{day.sessions}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.sessions / maxSessions) * 100}%` }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                className="w-full bg-accent/20 border border-accent/40 relative group hover:bg-accent/40 transition-colors cursor-pointer"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
              </motion.div>
              <span className="font-display text-[10px] font-bold text-text-muted tracking-widest uppercase">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-border bg-surface overflow-hidden brutal-shadow-sm">
        <div className="p-4 border-b border-border bg-dark flex items-center justify-between">
          <h2 className="font-display text-xs font-black text-text uppercase tracking-widest flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Recent Learners
          </h2>
          <span className="font-display text-[9px] font-bold tracking-widest text-text-muted uppercase px-2 py-1 border border-border bg-surface">{recentUsers.length} Users</span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-dark">
                <th className="text-left px-4 py-3 font-display text-[9px] font-bold tracking-widest text-text-muted uppercase">Name</th>
                <th className="text-left px-4 py-3 font-display text-[9px] font-bold tracking-widest text-text-muted uppercase">Plan</th>
                <th className="text-left px-4 py-3 font-display text-[9px] font-bold tracking-widest text-text-muted uppercase">Progress</th>
                <th className="text-left px-4 py-3 font-display text-[9px] font-bold tracking-widest text-text-muted uppercase">Streak</th>
                <th className="text-left px-4 py-3 font-display text-[9px] font-bold tracking-widest text-text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-dark transition-colors group">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-display text-sm font-bold text-text group-hover:text-accent transition-colors">{user.name}</p>
                      <p className="font-sans text-[10px] text-text-muted">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-display text-[10px] font-bold tracking-widest text-text-muted uppercase px-2 py-1 border border-border bg-dark">{user.plan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-dark border border-border">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-display text-[10px] font-bold text-text">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 font-display text-xs font-bold text-text">
                      <Flame className="w-3 h-3 text-danger" />
                      {user.streak}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-display text-[9px] font-bold tracking-widest uppercase px-2 py-1 border ${
                      user.status === 'Active' ? 'text-success border-success bg-success/10' :
                      user.status === 'Completed' ? 'text-accent border-accent bg-accent/10' :
                      'text-text-muted border-border bg-dark'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border">
          {recentUsers.map((user) => (
            <div key={user.id} className="p-4 space-y-2 hover:bg-dark transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold text-text">{user.name}</p>
                <span className={`font-display text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
                  user.status === 'Active' ? 'text-success border-success' :
                  user.status === 'Completed' ? 'text-accent border-accent' :
                  'text-text-muted border-border'
                }`}>
                  {user.status}
                </span>
              </div>
              <p className="font-display text-[10px] text-text-muted tracking-widest uppercase">{user.plan}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-1.5 bg-dark border border-border">
                    <div className="h-full bg-accent" style={{ width: `${user.progress}%` }}></div>
                  </div>
                  <span className="font-display text-[10px] font-bold text-text">{user.progress}%</span>
                </div>
                <span className="flex items-center gap-1 font-display text-[10px] font-bold text-text">
                  <Flame className="w-3 h-3 text-danger" />{user.streak}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

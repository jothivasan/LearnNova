import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { Trophy, Flame, Target, ArrowUp, ArrowDown, Minus } from "lucide-react";

export function Leaderboard() {
  const { leaderboard } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-10 pb-16"
    >
      <div className="border-b border-border pb-6">
        <p className="font-display text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3 bg-dark inline-block border border-accent px-3 py-1.5">
          SYS.RANKING // GLOBAL_LEADERBOARD
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-text uppercase leading-none tracking-tight">
          Top<br/><span className="text-transparent text-stroke-accent">Operatives</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-accent transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-6 h-6 text-accent" />
            <span className="font-display text-[10px] tracking-widest text-accent bg-dark px-2 py-1 border border-accent uppercase font-bold">
              YOUR_RANK
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Current_Standing</p>
          <p className="font-display text-4xl font-bold text-accent">#3</p>
        </div>

        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-text transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-text scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6 text-text" />
            <span className="font-display text-[10px] tracking-widest text-text-muted bg-dark px-2 py-1 border border-border uppercase font-bold">
              SCORE
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Total_Points</p>
          <p className="font-display text-4xl font-bold text-text">9,800</p>
        </div>

        <div className="border border-border bg-surface p-5 md:p-6 relative group hover:border-danger transition-colors brutal-shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-danger scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-6 h-6 text-danger" />
            <span className="font-display text-[10px] tracking-widest text-danger bg-danger/10 px-2 py-1 border border-danger uppercase font-bold">
              MAX: {useStore().longestStreak}
            </span>
          </div>
          <p className="font-display text-[10px] tracking-widest text-text-muted uppercase mb-1 font-bold">Active_Streak</p>
          <p className="font-display text-4xl font-bold text-danger">{useStore().currentStreak} Days</p>
        </div>
      </div>

      <div className="border border-border bg-surface overflow-hidden brutal-shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 md:p-5 border-b border-border bg-dark font-display text-[10px] font-bold text-text-muted uppercase tracking-widest">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">Operative_ID</div>
          <div className="col-span-4 md:col-span-3 text-right">Score</div>
          <div className="hidden md:block col-span-3 text-right">Streak</div>
        </div>
        
        <div className="divide-y divide-border">
          {leaderboard.map((entry) => (
            <div 
              key={entry.id} 
              className={`grid grid-cols-12 gap-2 sm:gap-4 p-4 md:p-5 items-center transition-colors group ${
                entry.isCurrentUser ? 'bg-dark border-l-4 border-l-accent' : 'hover:bg-dark'
              }`}
            >
              <div className="col-span-2 md:col-span-1 text-center font-display font-bold text-lg sm:text-xl">
                {entry.rank === 1 ? <span className="text-accent">#1</span> : 
                 entry.rank === 2 ? <span className="text-text">#2</span> : 
                 entry.rank === 3 ? <span className="text-danger">#3</span> : 
                 <span className="text-text-muted">#{entry.rank}</span>}
              </div>
              
              <div className="col-span-6 md:col-span-5 flex items-center gap-3 sm:gap-4 overflow-hidden">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 border flex items-center justify-center font-display text-xs sm:text-sm font-bold shrink-0 ${
                  entry.isCurrentUser ? 'border-accent text-dark bg-accent brutal-shadow-sm' : 'border-border text-text-muted bg-dark'
                }`}>
                  {entry.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`font-display font-bold tracking-widest uppercase truncate text-sm sm:text-base ${entry.isCurrentUser ? 'text-accent' : 'text-text group-hover:text-accent transition-colors'}`}>
                    {entry.username}
                  </div>
                  {entry.isCurrentUser && (
                    <div className="font-display text-[8px] sm:text-[10px] tracking-widest text-text font-bold uppercase block mt-0.5">Active User</div>
                  )}
                </div>
              </div>
              
              <div className="col-span-4 md:col-span-3 text-right font-display font-bold text-text text-lg sm:text-2xl tracking-tight">
                {entry.score.toLocaleString()}
              </div>
              
              <div className="hidden md:flex col-span-3 justify-end items-center gap-3 font-display font-bold text-lg">
                <Flame className={`w-6 h-6 ${entry.streak > 10 ? 'text-danger' : entry.streak > 5 ? 'text-accent' : 'text-text-muted'}`} />
                <span className={entry.streak > 10 ? 'text-danger' : entry.streak > 5 ? 'text-accent' : 'text-text-muted'}>
                  {entry.streak}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

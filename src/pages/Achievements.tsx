import { useStore } from "@/store/useStore";
import { motion } from "motion/react";
import { Trophy, Zap, Flame, BookOpen, Lock, CheckSquare, Award } from "lucide-react";

export function Achievements() {
  const { achievements } = useStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'Flame': return <Flame className="w-8 h-8" />;
      case 'BookOpen': return <BookOpen className="w-8 h-8" />;
      case 'Trophy': return <Trophy className="w-8 h-8" />;
      default: return <Award className="w-8 h-8" />;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-16"
    >
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-display text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3 bg-dark inline-block border border-accent px-3 py-1.5">
            SYS.REWARDS // ACHIEVEMENTS
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-text uppercase leading-none tracking-tight">
            Service<br/><span className="text-transparent text-stroke-accent">Medals</span>
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 bg-dark p-3 border border-border w-full md:w-auto mt-4 md:mt-0">
          <span className="font-display text-[10px] font-bold tracking-widest text-text uppercase block">UNLOCKED: {unlockedCount}/{totalCount}</span>
          <div className="w-full md:w-40 h-1.5 bg-surface border border-border overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, i) => {
          const isUnlocked = !!achievement.unlockedAt;
          
          return (
              <motion.div 
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`border p-6 md:p-8 relative group transition-all duration-300 ${
                isUnlocked 
                  ? 'border-border bg-surface hover:border-accent brutal-shadow-sm' 
                  : 'border-border/50 bg-dark opacity-80 grayscale'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 border flex items-center justify-center shadow-[2px_2px_0_var(--color-border)] transition-transform group-hover:scale-110 ${
                  isUnlocked ? 'border-accent text-dark bg-accent' : 'border-border text-text-muted bg-surface'
                }`}>
                  {getIcon(achievement.icon)}
                </div>
                {isUnlocked ? (
                  <span className="px-2 py-1 border border-accent font-display text-[8px] font-bold tracking-widest text-accent uppercase bg-dark flex items-center gap-1.5">
                    <CheckSquare className="w-3 h-3" />
                    ACQ
                  </span>
                ) : (
                  <span className="px-2 py-1 border border-border font-display text-[8px] font-bold tracking-widest text-text-muted uppercase bg-dark flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    LCK
                  </span>
                )}
              </div>
              
              <h3 className={`font-display text-2xl font-bold uppercase tracking-tight mb-3 ${isUnlocked ? 'text-text group-hover:text-accent transition-colors' : 'text-text-muted'}`}>
                {achievement.title}
              </h3>
              <p className="font-sans text-xs tracking-wide text-text-muted mb-6 leading-relaxed border-l-2 border-border pl-2">
                {achievement.description}
              </p>
              
              {isUnlocked && achievement.unlockedAt && (
                <div className="pt-4 border-t border-border font-display text-[8px] font-bold tracking-widest text-text-muted uppercase">
                  UNLOCKED_ON: {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  PenTool, 
  FileText, 
  BarChart3, 
  LogOut,
  PlusSquare,
  RotateCcw,
  Trophy,
  Award,
  Zap
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: PlusSquare, label: "Create Plan", path: "/create-plan" },
  { icon: CalendarDays, label: "Planner", path: "/planner" },
  { icon: BookOpen, label: "Theory", path: "/theory" },
  { icon: PenTool, label: "Practice", path: "/practice" },
  { icon: FileText, label: "Simulations", path: "/tests" },
  { icon: RotateCcw, label: "Revision", path: "/revision" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Award, label: "Achievements", path: "/achievements" },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-dark md:bg-dark border-r border-border flex flex-col shrink-0 relative z-20 h-full">
      <div className="h-20 flex items-center px-6 border-b border-border bg-accent text-dark">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 fill-current" />
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-tighter leading-none">LEARNNOVA</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <span className="text-[10px] tracking-[0.2em] font-display text-text-muted uppercase mb-4 block px-2">Navigation_01</span>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="block relative group"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-surface border border-border"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-4 px-4 py-3 transition-all duration-300 z-10",
                isActive ? "text-accent" : "text-text-muted group-hover:text-text group-hover:-translate-y-0.5 group-hover:bg-surface border border-transparent group-hover:border-border"
              )}>
                <item.icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-display tracking-widest uppercase mt-0.5">{item.label}</span>
                {isActive && (
                  <span className="absolute right-4 w-1.5 h-1.5 bg-accent" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border bg-surface">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-xs font-display tracking-widest uppercase text-text-muted hover:text-dark hover:bg-accent border border-border hover:border-accent transition-all duration-300 group">
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          <span className="mt-0.5">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}

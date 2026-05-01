import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  PenTool, 
  FileText, 
  BarChart3, 
  LogOut,
  PlusSquare,
  RotateCcw,
  Trophy,
  Award,
  Zap,
  Shield
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: PlusSquare, label: "Create Plan", path: "/create-plan" },
  { icon: CalendarDays, label: "Planner", path: "/planner" },
  { icon: PenTool, label: "Practice", path: "/practice" },
  { icon: FileText, label: "Simulations", path: "/tests" },
  { icon: RotateCcw, label: "Revision", path: "/revision" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Award, label: "Achievements", path: "/achievements" },
  { icon: Shield, label: "Admin", path: "/admin" },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-64 bg-dark md:bg-dark border-r border-border flex flex-col shrink-0 relative z-20 h-full">
      <div className="h-16 flex items-center px-6 border-b border-border bg-surface text-text">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-tight">LearnNova</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <span className="text-[11px] font-semibold text-text-muted/70 uppercase tracking-widest mb-3 block px-3">Menu</span>
        {navItems.filter(item => item.path !== '/admin' || useAuth().isAdmin).map((item) => {
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
                    className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 z-10",
                isActive 
                  ? "text-accent font-medium" 
                  : "text-text-muted hover:text-text hover:bg-surface-light font-medium"
              )}>
                <item.icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-text-muted/70")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[14px]">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border bg-surface">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2.5 w-full text-[13px] font-medium text-text-muted hover:text-text hover:bg-surface-light rounded-xl border border-transparent hover:border-border transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 text-text-muted/70 group-hover:text-danger transition-colors" strokeWidth={2} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

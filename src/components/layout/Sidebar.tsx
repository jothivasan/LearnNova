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
      <div className="h-16 flex items-center px-6 border-b border-border bg-accent text-dark">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 fill-current" />
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-tighter leading-none">LEARNNOVA</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] tracking-[0.2em] font-display text-text-muted uppercase mb-3 block px-2">Menu</span>
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
                  className="absolute inset-0 bg-surface border border-border"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-4 px-4 py-2.5 transition-all duration-300 z-10",
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
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-xs font-display tracking-widest uppercase text-text-muted hover:text-dark hover:bg-accent border border-border hover:border-accent transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          <span className="mt-0.5">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

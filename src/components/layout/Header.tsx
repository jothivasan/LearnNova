import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 sm:px-8 shrink-0 bg-dark z-30 ml-16 md:ml-0">
      <div className="flex items-center gap-4 flex-1">
        {/* Left side empty for neatness */}
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="relative p-2 rounded-full text-text-muted hover:text-text hover:bg-surface-light transition-all group"
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        <button className="relative p-2 rounded-full text-text-muted hover:text-text hover:bg-surface-light transition-all group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-dark"></span>
        </button>
        <div className="w-px h-6 bg-border mx-2"></div>
        <button className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-medium text-text group-hover:text-accent transition-colors">{user?.name || 'User'}</p>
            <p className="text-[11px] text-text-muted flex items-center justify-end gap-1">Level {user?.level || 1}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center font-display font-medium text-sm transition-all group-hover:bg-accent group-hover:text-white">
            {initials}
          </div>
        </button>
      </div>
    </header>
  );
}

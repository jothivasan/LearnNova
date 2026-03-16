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
          className="relative p-2.5 brutal-border text-text hover:text-dark hover:bg-accent transition-all group"
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        <button className="relative p-2.5 brutal-border text-text hover:text-dark hover:bg-accent transition-all group">
          <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-[1.5px] border-dark"></span>
        </button>
        <div className="w-px h-8 bg-border"></div>
        <button className="flex items-center gap-4 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-display text-text group-hover:text-accent transition-colors">{user?.name || 'User'}</p>
            <p className="text-[10px] text-text-muted font-sans tracking-widest mt-0.5 border border-border px-1.5 py-0.5 inline-block group-hover:border-accent group-hover:text-accent transition-colors">Level {user?.level || 1}</p>
          </div>
          <div className="w-10 h-10 brutal-border bg-accent text-dark flex items-center justify-center font-display text-lg transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_#f4f4f5]">
            {initials}
          </div>
        </button>
      </div>
    </header>
  );
}

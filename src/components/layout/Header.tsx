import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 border-b border-border flex items-center justify-between px-6 sm:px-8 shrink-0 bg-dark z-30 ml-16 md:ml-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search Protocol" 
            className="w-full pl-12 pr-4 py-3 brutal-border text-sm tracking-wide text-text font-display focus:outline-none focus:border-accent transition-all placeholder:text-text-muted"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 sm:gap-8 ml-auto">
        <div className="hidden md:flex items-center gap-2 text-[10px] tracking-widest text-text font-display uppercase border border-border px-3 py-1.5 bg-surface">
          <span className="w-1.5 h-1.5 bg-success animate-pulse"></span>
          SYS.ONLINE
        </div>
        <button className="relative p-2.5 brutal-border text-text hover:text-dark hover:bg-accent transition-all group">
          <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-[1.5px] border-dark"></span>
        </button>
        <div className="w-px h-8 bg-border"></div>
        <button className="flex items-center gap-4 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-display text-text group-hover:text-accent transition-colors">Jane Doe</p>
            <p className="text-[10px] text-text-muted font-sans tracking-widest mt-0.5 border border-border px-1.5 py-0.5 inline-block group-hover:border-accent group-hover:text-accent transition-colors">Level 12</p>
          </div>
          <div className="w-10 h-10 brutal-border bg-accent text-dark flex items-center justify-center font-display text-lg transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_#f4f4f5]">
            JD
          </div>
        </button>
      </div>
    </header>
  );
}

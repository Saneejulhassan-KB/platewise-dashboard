import { Bell, Moon, Sun, Search, User } from "lucide-react";
import { useState } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { alerts } from "@/data/dummy";

const Topbar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <header className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search plates, cameras..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          {theme === "light" ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all relative"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-12 w-80 glass-card rounded-2xl shadow-xl border border-border/50 z-50 overflow-hidden animate-fade-up">
                <div className="px-4 py-3 border-b border-border/50">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {alerts.slice(0, 5).map(alert => (
                    <div key={alert.id} className={`px-4 py-3 border-b border-border/30 text-sm ${!alert.read ? "bg-primary/5" : ""}`}>
                      <p className="text-foreground text-xs leading-relaxed">{alert.message}</p>
                      <p className="text-muted-foreground text-[10px] mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/50">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-foreground">Admin</p>
            <p className="text-[10px] text-muted-foreground">admin@anpr.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

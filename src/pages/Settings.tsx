import { Moon, Sun, User, Bell, Shield, Monitor } from "lucide-react";
import { useThemeContext } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="space-y-6 animate-fade-up max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">System preferences & profile</p>
      </div>

      {/* Theme */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Theme</p>
            <p className="text-xs text-muted-foreground">Toggle between light and dark mode</p>
          </div>
          <button onClick={toggleTheme} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Profile</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
              <input defaultValue="Admin User" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
              <input defaultValue="admin@anpr.com" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Update Profile
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="space-y-3">
          {["Blacklisted vehicle alerts", "Camera offline alerts", "Daily summary report", "System updates"].map((label, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

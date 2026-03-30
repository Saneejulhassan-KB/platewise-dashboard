import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Camera, FileText, Shield, Bell, BarChart3,
  Settings, Users, ChevronLeft, ChevronRight, Radio, X, Scan
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/live-cameras", label: "Live Cameras", icon: Camera },
  { path: "/vehicle-logs", label: "Vehicle Logs", icon: FileText },
  { path: "/blacklist", label: "Blacklist/Whitelist", icon: Shield },
  { path: "/alerts", label: "Alerts", icon: Bell },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/cameras", label: "Camera Mgmt", icon: Radio },
  { path: "/users", label: "User Mgmt", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar z-50 flex flex-col transition-all duration-300 border-r border-sidebar-border
        ${collapsed ? "lg:w-[70px]" : "lg:w-[260px]"}
        ${mobileOpen ? "w-[260px] translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 glow-primary">
            <Scan className="w-5 h-5 text-primary-foreground" />
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="animate-slide-in">
              <h1 className="text-sm font-bold text-sidebar-accent-foreground tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                ANPR<span className="text-primary">SEC</span>
              </h1>
              <p className="text-[9px] text-sidebar-muted tracking-[0.2em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Surveillance System
              </p>
            </div>
          )}
        </div>
        <button onClick={onMobileClose} className="lg:hidden p-1.5 rounded-lg text-sidebar-muted hover:text-sidebar-accent-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Section label */}
      {(!collapsed || mobileOpen) && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-[9px] font-semibold text-sidebar-muted tracking-[0.25em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            Main Menu
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          const showLabel = !collapsed || mobileOpen;
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary/15 text-primary border-l-2 border-primary shadow-[inset_0_0_20px_-10px_hsl(var(--primary)/0.2)]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-l-2 border-transparent"
              }`}
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: isActive ? 600 : 500, letterSpacing: '0.02em' }}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary/70 transition-colors"}`} />
              {showLabel && <span className="animate-slide-in">{label}</span>}
              {isActive && (
                <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary glow-primary status-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System status footer */}
      {(!collapsed || mobileOpen) && (
        <div className="px-4 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success glow-success status-pulse" />
            <span className="text-[10px] text-sidebar-muted tracking-wider uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              System Online
            </span>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="hidden lg:flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-muted hover:text-primary transition-colors"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
};

export default Sidebar;

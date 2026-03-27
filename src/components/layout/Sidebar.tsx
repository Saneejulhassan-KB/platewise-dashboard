import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Camera, FileText, Shield, Bell, BarChart3,
  Settings, Users, ChevronLeft, ChevronRight, Radio, X
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
      className={`fixed left-0 top-0 h-full bg-sidebar z-50 flex flex-col transition-all duration-300
        ${collapsed ? "lg:w-[70px]" : "lg:w-[250px]"}
        ${mobileOpen ? "w-[250px] translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <Camera className="w-5 h-5 text-primary-foreground" />
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="animate-slide-in">
              <h1 className="text-sm font-bold text-sidebar-accent-foreground tracking-tight">ANPR System</h1>
              <p className="text-[10px] text-sidebar-muted">Camera Management</p>
            </div>
          )}
        </div>
        {/* Mobile close */}
        <button onClick={onMobileClose} className="lg:hidden p-1.5 rounded-lg text-sidebar-muted hover:text-sidebar-accent-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          const showLabel = !collapsed || mobileOpen;
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
              {showLabel && <span className="animate-slide-in">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle - desktop only */}
      <button
        onClick={onToggle}
        className="hidden lg:flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
};

export default Sidebar;

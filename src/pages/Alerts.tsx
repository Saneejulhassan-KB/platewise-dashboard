import { AlertTriangle, Camera, Activity, CheckCircle2, XCircle } from "lucide-react";
import { alerts } from "@/data/dummy";
import { useState } from "react";

const alertIcons: Record<string, React.ElementType> = {
  blacklisted: AlertTriangle,
  offline: Camera,
  unusual: Activity,
};

const alertColors: Record<string, string> = {
  blacklisted: "bg-destructive/10 text-destructive border-destructive/20",
  offline: "bg-warning/10 text-warning border-warning/20",
  unusual: "bg-info/10 text-info border-info/20",
};

const Alerts = () => {
  const [items, setItems] = useState(alerts);

  const markRead = (id: number) => {
    setItems(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllRead = () => {
    setItems(prev => prev.map(a => ({ ...a, read: true })));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.filter(a => !a.read).length} unread alerts</p>
        </div>
        <button onClick={markAllRead} className="px-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {items.map(alert => {
          const Icon = alertIcons[alert.type] || AlertTriangle;
          return (
            <div
              key={alert.id}
              className={`glass-card rounded-2xl p-4 flex items-start gap-4 transition-all ${
                !alert.read ? "border-l-4 " + alertColors[alert.type] : "opacity-60"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                alertColors[alert.type].split(" ").slice(0, 1).join(" ")
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!alert.read ? (
                  <button onClick={() => markRead(alert.id)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-success transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">Read</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;

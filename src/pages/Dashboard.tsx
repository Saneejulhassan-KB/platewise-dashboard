import {
  Car, Camera, AlertTriangle, ArrowDownLeft, ArrowUpRight,
  TrendingUp, TrendingDown, Shield, Eye
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { summaryCards, hourlyData, weeklyData, recentActivity } from "@/data/dummy";

const iconMap: Record<string, React.ElementType> = {
  Car, Camera, AlertTriangle, ArrowDownLeft, ArrowUpRight,
};

const cardAccents = [
  "border-l-primary",
  "border-l-success",
  "border-l-destructive",
  "border-l-info",
  "border-l-warning",
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Command Center
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '0.05em' }}>
            Real-time surveillance analytics • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-medium text-muted-foreground" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            Threat Level: LOW
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, i) => {
          const Icon = iconMap[card.icon] || Car;
          return (
            <div
              key={i}
              className={`glass-card-hover rounded-xl p-4 border-l-[3px] ${cardAccents[i % cardAccents.length]}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${card.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{card.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                {card.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-5 hud-corners">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <span className="w-2 h-2 rounded-full bg-primary glow-primary status-pulse" />
            Vehicle Detection — Today
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="vehicleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              />
              <Area type="monotone" dataKey="vehicles" stroke="hsl(195, 100%, 50%)" fill="url(#vehicleGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5 hud-corners">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <span className="w-2 h-2 rounded-full bg-accent glow-primary status-pulse" />
            Weekly Entries vs Exits
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              />
              <Bar dataKey="entries" fill="hsl(195, 100%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="exits" fill="hsl(160, 100%, 44%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Recent Detections
          </h3>
          <span className="text-[10px] text-muted-foreground ml-auto" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            Live Feed
          </span>
          <span className="w-2 h-2 rounded-full bg-success glow-success status-pulse" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-secondary/30">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Plate</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Time</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Zone</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Type</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(row => (
                <tr key={row.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3 font-semibold text-foreground tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '13px' }}>
                    {row.plate}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px' }}>{row.time}</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{row.location}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      row.type === "entry" ? "bg-success/10 text-success border border-success/20" : "bg-info/10 text-info border border-info/20"
                    }`}>
                      {row.type === "entry" ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                      {row.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    normal: "bg-secondary text-secondary-foreground border-border/30",
    blacklisted: "bg-destructive/10 text-destructive border-destructive/20 glow-danger",
    vip: "bg-warning/10 text-warning border-warning/20",
    staff: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${styles[status] || styles.normal}`}>
      {status}
    </span>
  );
};

export default Dashboard;

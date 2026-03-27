import {
  Car, Camera, AlertTriangle, ArrowDownLeft, ArrowUpRight,
  TrendingUp, TrendingDown
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { summaryCards, hourlyData, weeklyData, recentActivity } from "@/data/dummy";

const iconMap: Record<string, React.ElementType> = {
  Car, Camera, AlertTriangle, ArrowDownLeft, ArrowUpRight,
};

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time ANPR monitoring & analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, i) => {
          const Icon = iconMap[card.icon] || Car;
          return (
            <div key={i} className="glass-card-hover rounded-2xl p-5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${card.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Count – Today</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="vehicleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(230, 70%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(230, 70%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="vehicles" stroke="hsl(230, 70%, 55%)" fill="url(#vehicleGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Entries vs Exits</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="entries" fill="hsl(230, 70%, 55%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="exits" fill="hsl(190, 85%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Plate Number</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Time</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Location</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(row => (
                <tr key={row.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-foreground">{row.plate}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.time}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.location}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.type === "entry" ? "bg-success/10 text-success" : "bg-info/10 text-info"
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
    normal: "bg-secondary text-secondary-foreground",
    blacklisted: "bg-destructive/10 text-destructive",
    vip: "bg-warning/10 text-warning",
    staff: "bg-primary/10 text-primary",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.normal}`}>
      {status}
    </span>
  );
};

export default Dashboard;

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, FileText } from "lucide-react";
import { monthlyData, weeklyData } from "@/data/dummy";

const locationData = [
  { name: "Gate A", value: 35 },
  { name: "Gate B", value: 25 },
  { name: "Gate C", value: 20 },
  { name: "Gate D", value: 12 },
  { name: "Parking", value: 8 },
];

const COLORS = ["hsl(230, 70%, 55%)", "hsl(190, 85%, 45%)", "hsl(155, 70%, 40%)", "hsl(38, 90%, 55%)", "hsl(280, 60%, 55%)"];

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive vehicle data insights</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <FileText className="w-4 h-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Vehicle Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="vehicles" stroke="hsl(230, 70%, 55%)" strokeWidth={2.5} dot={{ fill: "hsl(230, 70%, 55%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Location Distribution */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Traffic by Location</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={locationData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {locationData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Comparison */}
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Entry vs Exit Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
              <Bar dataKey="entries" fill="hsl(230, 70%, 55%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="exits" fill="hsl(190, 85%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;

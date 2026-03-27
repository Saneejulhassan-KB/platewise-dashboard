import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { vehicleLogs } from "@/data/dummy";

const ITEMS_PER_PAGE = 10;

const VehicleLogs = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = vehicleLogs.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vehicle Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">{vehicleLogs.length} records found</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by plate or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Plate</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Entry</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Exit</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Location</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Snapshot</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(row => (
                <tr key={row.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-foreground">{row.plate}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.entryTime}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.exitTime}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.location}</td>
                  <td className="px-5 py-3">
                    <div className="w-10 h-7 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <Image className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === page ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.normal}`}>{status}</span>;
};

export default VehicleLogs;

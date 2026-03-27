import { useState } from "react";
import { Shield, Plus, Trash2, Search } from "lucide-react";
import { blacklistEntries } from "@/data/dummy";

const BlacklistManagement = () => {
  const [entries, setEntries] = useState(blacklistEntries);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newPlate, setNewPlate] = useState("");
  const [newTag, setNewTag] = useState<"blocked" | "vip" | "staff">("blocked");
  const [newReason, setNewReason] = useState("");

  const filtered = entries.filter(e =>
    e.plate.toLowerCase().includes(search.toLowerCase()) ||
    e.tag.includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newPlate.trim()) return;
    setEntries(prev => [...prev, {
      id: prev.length + 1,
      plate: newPlate.toUpperCase(),
      tag: newTag,
      reason: newReason,
      addedDate: new Date().toISOString().slice(0, 10),
      addedBy: "Admin",
    }]);
    setNewPlate(""); setNewReason(""); setShowAdd(false);
  };

  const handleRemove = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const tagStyles: Record<string, string> = {
    blocked: "bg-destructive/10 text-destructive",
    vip: "bg-warning/10 text-warning",
    staff: "bg-primary/10 text-primary",
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blacklist / Whitelist</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage tagged vehicles</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="glass-card rounded-2xl p-5 animate-fade-up">
          <h3 className="text-sm font-semibold text-foreground mb-4">Add New Entry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input value={newPlate} onChange={e => setNewPlate(e.target.value)} placeholder="Plate number" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={newTag} onChange={e => setNewTag(e.target.value as typeof newTag)} className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="blocked">Blocked</option>
              <option value="vip">VIP</option>
              <option value="staff">Staff</option>
            </select>
            <input value={newReason} onChange={e => setNewReason(e.target.value)} placeholder="Reason" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search plates or tags..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Plate</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Tag</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Reason</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Added</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">By</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-foreground">{entry.plate}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${tagStyles[entry.tag]}`}>{entry.tag}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{entry.reason}</td>
                  <td className="px-5 py-3 text-muted-foreground">{entry.addedDate}</td>
                  <td className="px-5 py-3 text-muted-foreground">{entry.addedBy}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleRemove(entry.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default BlacklistManagement;

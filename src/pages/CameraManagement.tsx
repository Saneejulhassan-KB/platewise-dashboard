import { useState } from "react";
import { Camera, Plus, Pencil, Trash2, Wifi, WifiOff, MapPin, Power } from "lucide-react";
import { cameras as initialCameras } from "@/data/dummy";

const CameraManagement = () => {
  const [cams, setCams] = useState(initialCameras);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", location: "", ip: "", resolution: "1080p" });

  const handleAdd = () => {
    if (!form.name || !form.ip) return;
    setCams(prev => [...prev, { id: prev.length + 1, ...form, status: "online" as const, lastSeen: "Just now" }]);
    setForm({ name: "", location: "", ip: "", resolution: "1080p" });
    setShowAdd(false);
  };

  const toggleStatus = (id: number) => {
    setCams(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "online" ? "offline" as const : "online" as const } : c));
  };

  const handleDelete = (id: number) => {
    setCams(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Camera Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{cams.length} cameras configured</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Camera
        </button>
      </div>

      {showAdd && (
        <div className="glass-card rounded-2xl p-5 animate-fade-up">
          <h3 className="text-sm font-semibold text-foreground mb-4">Add New Camera</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Camera name" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Location" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.ip} onChange={e => setForm(f => ({ ...f, ip: e.target.value }))} placeholder="IP Address" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={form.resolution} onChange={e => setForm(f => ({ ...f, resolution: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>720p</option><option>1080p</option><option>4K</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium">Save</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Camera Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cams.map(cam => (
          <div key={cam.id} className="glass-card-hover rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cam.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{cam.location}</span>
                  </div>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${cam.status === "online" ? "text-success" : "text-destructive"}`}>
                {cam.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {cam.status}
              </span>
            </div>
            <div className="space-y-1.5 mb-4">
              <p className="text-xs text-muted-foreground">IP: <span className="font-mono text-foreground">{cam.ip}</span></p>
              <p className="text-xs text-muted-foreground">Resolution: <span className="text-foreground">{cam.resolution}</span></p>
              <p className="text-xs text-muted-foreground">Last seen: {cam.lastSeen}</p>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-border/30">
              <button onClick={() => toggleStatus(cam.id)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${cam.status === "online" ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "bg-success/10 text-success hover:bg-success/20"}`}>
                <Power className="w-3 h-3" />
                {cam.status === "online" ? "Disable" : "Enable"}
              </button>
              <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(cam.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraManagement;

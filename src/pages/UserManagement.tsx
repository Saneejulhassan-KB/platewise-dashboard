import { useState } from "react";
import { User, Plus, Pencil, Trash2, Shield, Eye } from "lucide-react";
import { users as initialUsers } from "@/data/dummy";

const roleIcons: Record<string, React.ElementType> = { admin: Shield, operator: User, viewer: Eye };
const roleColors: Record<string, string> = {
  admin: "bg-destructive/10 text-destructive",
  operator: "bg-primary/10 text-primary",
  viewer: "bg-secondary text-secondary-foreground",
};

const UserManagement = () => {
  const [userList, setUserList] = useState(initialUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "viewer" as const });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setUserList(prev => [...prev, { id: prev.length + 1, ...form, status: "active" as const, lastLogin: "Never" }]);
    setForm({ name: "", email: "", role: "viewer" });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{userList.length} users</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {showAdd && (
        <div className="glass-card rounded-2xl p-5 animate-fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as typeof form.role }))} className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="admin">Admin</option><option value="operator">Operator</option><option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">User</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Last Login</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user => {
                const RoleIcon = roleIcons[user.role] || User;
                return (
                  <tr key={user.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
                        <RoleIcon className="w-3 h-3" /> {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{user.lastLogin}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setUserList(prev => prev.filter(u => u.id !== user.id))} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

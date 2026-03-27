// Dummy data for the ANPR dashboard

export const summaryCards = [
  { title: "Total Vehicles Today", value: "2,847", change: "+12.5%", trend: "up" as const, icon: "Car" },
  { title: "Active Cameras", value: "24/28", change: "85.7%", trend: "up" as const, icon: "Camera" },
  { title: "Alerts Today", value: "17", change: "+3", trend: "up" as const, icon: "AlertTriangle" },
  { title: "Entries Today", value: "1,423", change: "+8.2%", trend: "up" as const, icon: "ArrowDownLeft" },
  { title: "Exits Today", value: "1,424", change: "+7.9%", trend: "up" as const, icon: "ArrowUpRight" },
];

export const hourlyData = [
  { hour: "6AM", vehicles: 45 }, { hour: "7AM", vehicles: 120 }, { hour: "8AM", vehicles: 280 },
  { hour: "9AM", vehicles: 350 }, { hour: "10AM", vehicles: 220 }, { hour: "11AM", vehicles: 180 },
  { hour: "12PM", vehicles: 250 }, { hour: "1PM", vehicles: 270 }, { hour: "2PM", vehicles: 200 },
  { hour: "3PM", vehicles: 190 }, { hour: "4PM", vehicles: 310 }, { hour: "5PM", vehicles: 380 },
  { hour: "6PM", vehicles: 340 }, { hour: "7PM", vehicles: 220 }, { hour: "8PM", vehicles: 130 },
  { hour: "9PM", vehicles: 80 }, { hour: "10PM", vehicles: 45 }, { hour: "11PM", vehicles: 25 },
];

export const weeklyData = [
  { day: "Mon", entries: 1200, exits: 1180 },
  { day: "Tue", entries: 1350, exits: 1340 },
  { day: "Wed", entries: 1100, exits: 1090 },
  { day: "Thu", entries: 1450, exits: 1460 },
  { day: "Fri", entries: 1600, exits: 1580 },
  { day: "Sat", entries: 800, exits: 810 },
  { day: "Sun", entries: 500, exits: 490 },
];

export const recentActivity = [
  { id: 1, plate: "MH 12 AB 1234", time: "2 min ago", location: "Gate A - Entry", type: "entry" as const, status: "normal" as const },
  { id: 2, plate: "DL 01 CD 5678", time: "5 min ago", location: "Gate B - Exit", type: "exit" as const, status: "normal" as const },
  { id: 3, plate: "KA 05 EF 9012", time: "8 min ago", location: "Gate A - Entry", type: "entry" as const, status: "blacklisted" as const },
  { id: 4, plate: "TN 09 GH 3456", time: "12 min ago", location: "Gate C - Entry", type: "entry" as const, status: "vip" as const },
  { id: 5, plate: "UP 32 IJ 7890", time: "15 min ago", location: "Gate B - Exit", type: "exit" as const, status: "normal" as const },
  { id: 6, plate: "RJ 14 KL 2345", time: "18 min ago", location: "Gate A - Entry", type: "entry" as const, status: "normal" as const },
  { id: 7, plate: "GJ 01 MN 6789", time: "22 min ago", location: "Gate D - Exit", type: "exit" as const, status: "staff" as const },
  { id: 8, plate: "MP 09 OP 1234", time: "25 min ago", location: "Gate C - Entry", type: "entry" as const, status: "normal" as const },
];

export const cameras = [
  { id: 1, name: "Gate A - Entry", location: "Main Entrance", ip: "192.168.1.101", status: "online" as const, lastSeen: "Just now", resolution: "1080p" },
  { id: 2, name: "Gate A - Exit", location: "Main Entrance", ip: "192.168.1.102", status: "online" as const, lastSeen: "Just now", resolution: "1080p" },
  { id: 3, name: "Gate B - Entry", location: "South Wing", ip: "192.168.1.103", status: "online" as const, lastSeen: "Just now", resolution: "4K" },
  { id: 4, name: "Gate B - Exit", location: "South Wing", ip: "192.168.1.104", status: "offline" as const, lastSeen: "15 min ago", resolution: "1080p" },
  { id: 5, name: "Gate C - Entry", location: "East Wing", ip: "192.168.1.105", status: "online" as const, lastSeen: "Just now", resolution: "1080p" },
  { id: 6, name: "Gate C - Exit", location: "East Wing", ip: "192.168.1.106", status: "online" as const, lastSeen: "Just now", resolution: "4K" },
  { id: 7, name: "Parking Lot A", location: "Basement Level 1", ip: "192.168.1.107", status: "online" as const, lastSeen: "Just now", resolution: "1080p" },
  { id: 8, name: "Parking Lot B", location: "Basement Level 2", ip: "192.168.1.108", status: "offline" as const, lastSeen: "1 hour ago", resolution: "720p" },
  { id: 9, name: "Gate D - Entry", location: "VIP Entrance", ip: "192.168.1.109", status: "online" as const, lastSeen: "Just now", resolution: "4K" },
  { id: 10, name: "Gate D - Exit", location: "VIP Entrance", ip: "192.168.1.110", status: "online" as const, lastSeen: "Just now", resolution: "4K" },
  { id: 11, name: "Highway Cam 1", location: "NH-48 Junction", ip: "192.168.1.111", status: "online" as const, lastSeen: "Just now", resolution: "4K" },
  { id: 12, name: "Highway Cam 2", location: "NH-48 Overpass", ip: "192.168.1.112", status: "offline" as const, lastSeen: "3 hours ago", resolution: "1080p" },
];

export const vehicleLogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  plate: `${["MH","DL","KA","TN","UP","RJ","GJ","MP"][i % 8]} ${String(Math.floor(Math.random()*50)+1).padStart(2,"0")} ${String.fromCharCode(65+Math.floor(Math.random()*26))}${String.fromCharCode(65+Math.floor(Math.random()*26))} ${String(Math.floor(Math.random()*9000)+1000)}`,
  entryTime: `${String(6 + Math.floor(i / 3)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  exitTime: i % 3 === 0 ? "—" : `${String(8 + Math.floor(i / 3)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  location: ["Gate A", "Gate B", "Gate C", "Gate D", "Parking A", "Parking B"][i % 6],
  status: (["normal", "vip", "staff", "blacklisted"] as const)[i % 4],
}));

export const blacklistEntries = [
  { id: 1, plate: "KA 05 EF 9012", tag: "blocked" as const, reason: "Stolen vehicle report", addedDate: "2024-01-15", addedBy: "Admin" },
  { id: 2, plate: "DL 03 XY 4567", tag: "blocked" as const, reason: "Trespassing incident", addedDate: "2024-02-20", addedBy: "Admin" },
  { id: 3, plate: "MH 01 AB 1111", tag: "vip" as const, reason: "CEO vehicle", addedDate: "2024-01-01", addedBy: "Admin" },
  { id: 4, plate: "TN 10 CD 2222", tag: "vip" as const, reason: "Board member", addedDate: "2024-01-01", addedBy: "Admin" },
  { id: 5, plate: "GJ 01 MN 6789", tag: "staff" as const, reason: "Security team lead", addedDate: "2024-03-01", addedBy: "HR" },
  { id: 6, plate: "UP 80 QR 3333", tag: "blocked" as const, reason: "Parking violation - repeat", addedDate: "2024-03-10", addedBy: "Security" },
  { id: 7, plate: "RJ 14 ST 4444", tag: "staff" as const, reason: "Maintenance crew", addedDate: "2024-02-15", addedBy: "HR" },
  { id: 8, plate: "MP 09 UV 5555", tag: "blocked" as const, reason: "Unauthorized access attempt", addedDate: "2024-03-12", addedBy: "Security" },
];

export const alerts = [
  { id: 1, type: "blacklisted" as const, message: "Blacklisted vehicle KA 05 EF 9012 detected at Gate A", time: "8 min ago", read: false },
  { id: 2, type: "offline" as const, message: "Camera Gate B - Exit went offline", time: "15 min ago", read: false },
  { id: 3, type: "unusual" as const, message: "Unusual activity detected at Parking Lot B", time: "32 min ago", read: false },
  { id: 4, type: "blacklisted" as const, message: "Blacklisted vehicle DL 03 XY 4567 detected at Gate C", time: "1 hour ago", read: true },
  { id: 5, type: "offline" as const, message: "Camera Parking Lot B went offline", time: "1 hour ago", read: true },
  { id: 6, type: "unusual" as const, message: "Multiple failed plate reads at Gate D", time: "2 hours ago", read: true },
  { id: 7, type: "blacklisted" as const, message: "Blacklisted vehicle UP 80 QR 3333 detected at Gate B", time: "3 hours ago", read: true },
  { id: 8, type: "offline" as const, message: "Camera Highway Cam 2 went offline", time: "3 hours ago", read: true },
];

export const users = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@anpr.com", role: "admin" as const, status: "active" as const, lastLogin: "Just now" },
  { id: 2, name: "Priya Sharma", email: "priya@anpr.com", role: "admin" as const, status: "active" as const, lastLogin: "2 hours ago" },
  { id: 3, name: "Amit Patel", email: "amit@anpr.com", role: "operator" as const, status: "active" as const, lastLogin: "1 day ago" },
  { id: 4, name: "Sneha Reddy", email: "sneha@anpr.com", role: "operator" as const, status: "active" as const, lastLogin: "3 hours ago" },
  { id: 5, name: "Vikram Singh", email: "vikram@anpr.com", role: "viewer" as const, status: "inactive" as const, lastLogin: "1 week ago" },
  { id: 6, name: "Neha Gupta", email: "neha@anpr.com", role: "viewer" as const, status: "active" as const, lastLogin: "5 hours ago" },
];

export const monthlyData = [
  { month: "Jan", vehicles: 28500 }, { month: "Feb", vehicles: 31200 },
  { month: "Mar", vehicles: 29800 }, { month: "Apr", vehicles: 33400 },
  { month: "May", vehicles: 35100 }, { month: "Jun", vehicles: 32700 },
  { month: "Jul", vehicles: 34900 }, { month: "Aug", vehicles: 36200 },
  { month: "Sep", vehicles: 33800 }, { month: "Oct", vehicles: 37500 },
  { month: "Nov", vehicles: 35600 }, { month: "Dec", vehicles: 38100 },
];

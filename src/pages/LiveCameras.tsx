import { Camera, Wifi, WifiOff, MapPin } from "lucide-react";
import { cameras } from "@/data/dummy";

const LiveCameras = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Camera Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {cameras.filter(c => c.status === "online").length} of {cameras.length} cameras online
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {cameras.map((cam) => (
          <div key={cam.id} className="glass-card-hover rounded-2xl overflow-hidden group">
            {/* Video placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--border)/0.1)_2px,hsl(var(--border)/0.1)_4px)] opacity-50" />
              <Camera className="w-12 h-12 text-muted-foreground/30" />
              {cam.status === "online" && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-card/80 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-success status-pulse" />
                  <span className="text-[10px] font-semibold text-success">LIVE</span>
                </div>
              )}
              {cam.status === "offline" && (
                <div className="absolute inset-0 bg-card/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <WifiOff className="w-8 h-8 text-destructive mx-auto mb-1" />
                    <p className="text-xs font-medium text-destructive">Offline</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-card/80 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-muted-foreground">{cam.resolution}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cam.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{cam.location}</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  cam.status === "online" ? "text-success" : "text-destructive"
                }`}>
                  {cam.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {cam.status}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Last seen: {cam.lastSeen}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCameras;

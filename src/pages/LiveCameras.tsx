import { Camera, Wifi, WifiOff, MapPin, Shield } from "lucide-react";
import { cameras } from "@/data/dummy";

const LiveCameras = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Live Surveillance
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px' }}>
            {cameras.filter(c => c.status === "online").length}/{cameras.length} feeds active
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {cameras.map((cam) => (
          <div key={cam.id} className="glass-card-hover rounded-xl overflow-hidden group">
            {/* Video placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden scan-lines">
              <Camera className="w-12 h-12 text-muted-foreground/20" />
              {cam.status === "online" && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-card/90 backdrop-blur-sm border border-success/20">
                  <span className="w-2 h-2 rounded-full bg-success glow-success status-pulse" />
                  <span className="text-[10px] font-bold text-success tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>REC</span>
                </div>
              )}
              {cam.status === "offline" && (
                <div className="absolute inset-0 bg-card/70 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <WifiOff className="w-8 h-8 text-destructive mx-auto mb-1" />
                    <p className="text-xs font-semibold text-destructive uppercase tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                      Signal Lost
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-card/90 backdrop-blur-sm border border-border/30">
                <span className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{cam.resolution}</span>
              </div>
              {/* HUD corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40 pointer-events-none" />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{cam.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{cam.location}</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                  cam.status === "online" ? "text-success" : "text-destructive"
                }`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {cam.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {cam.status}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Last: {cam.lastSeen}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCameras;

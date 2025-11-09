import { Skeleton } from "@mui/material";
import { Surface } from "../surface/surface";
import "../stats-section/stats-section.scss";

export const StatsSkeleton = () => {
  return (
    <Surface className="stats-section-surface">
      <div className="stats-section">
        <div className="stats-card-skeleton">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Skeleton variant="rounded" width={48} height={48} />
            <Skeleton variant="text" width={180} height={24} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton variant="text" width="60%" height={48} />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
        </div>
        <div className="chart-container">
          <Skeleton variant="text" width={180} height={24} />
          <div className="chart-wrapper">
            <Skeleton variant="circular" width={250} height={250} />
          </div>
        </div>
      </div>
    </Surface>
  );
};

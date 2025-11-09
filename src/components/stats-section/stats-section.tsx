import { TrendingUp } from "@mui/icons-material";
import { useMemo } from "react";
import { useAssetsContext } from "../../context/hooks/assets-hook";
import { PieChart } from "../charts/pie-chart";
import { Surface } from "../surface/surface";
import "./stats-section.scss";

export const StatsSection = () => {
  const { filteredAssets } = useAssetsContext();

  const totalValue = useMemo(() => {
    return filteredAssets.reduce((sum, asset) => sum + asset.value, 0);
  }, [filteredAssets]);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalValue);

  return (
    <Surface className="stats-section-surface">
      <div className="stats-section">
        <div className="stats-card">
          <div className="stats-card__header">
            <div className="stats-card__icon">
              <TrendingUp />
            </div>
            <h3 className="stats-card__title">Total Asset Value</h3>
          </div>
          <div className="stats-card__content">
            <div className="stats-card__value">{formattedTotal}</div>
            <div className="stats-card__subtitle">
              Across {filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"}
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Distribution by Type</h3>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </div>
      </div>
    </Surface>
  );
};

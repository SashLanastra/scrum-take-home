import {
  ArcElement,
  type ChartData,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import type { EType } from "../../api/assets";
import { useAssetsContext } from "../../context/hooks/assets-hook";
import { typeColors } from "../badges/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const { filteredAssets } = useAssetsContext();

  const typeData = useMemo(() => {
    // Group assets by type and sum their values
    const grouped = filteredAssets.reduce(
      (acc, asset) => {
        acc[asset.type] = (acc[asset.type] || 0) + asset.value;
        return acc;
      },
      {} as Record<EType, number>,
    );

    // Calculate total value
    const totalValue = Object.values(grouped).reduce((sum, val) => sum + val, 0);

    // Convert to arrays for chart
    const types = Object.keys(grouped) as EType[];
    const values = types.map((type) => grouped[type]);
    const percentages = types.map((type) => ((grouped[type] / totalValue) * 100).toFixed(1));

    return { types, values, percentages, totalValue };
  }, [filteredAssets]);

  const data: ChartData<"pie"> = {
    labels: typeData.types.map((type) => typeColors[type].text),
    datasets: [
      {
        data: typeData.values,
        backgroundColor: typeData.types.map((type) => typeColors[type].border),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          padding: 15,
          font: {
            size: 13,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
        maxHeight: 60,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = typeData.percentages[context.dataIndex];
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

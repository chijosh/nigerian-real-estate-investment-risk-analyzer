import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RiskRadarChartProps {
  regionData: {
    name: string;
    value: number;
  }[];
}

export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ regionData }) => {
  const data = {
    labels: regionData.map(item => item.name),
    datasets: [
      {
        label: 'Risk Score',
        data: regionData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#2563eb',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Makes it a horizontal bar chart
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => `Risk Score: ${tooltipItem.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title = 'Bar Chart' }) => {
  
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `$${context.parsed.y.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 12,
            },
            callback: function (value) {
              return '$' + value / 1000 + 'k';
            },
          },
          beginAtZero: true,
          max: 80000,
        },
      },
      datasets: {
        bar: {
          barPercentage: 0.5,
          categoryPercentage: 0.7,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    }),
    []
  );

  // Memoize chartData and only recalculate it when the 'data' prop changes.
  const chartData = useMemo(() => {
    return {
      ...data,
    };
  }, [data]);

  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      </div>
      <div className='h-64'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

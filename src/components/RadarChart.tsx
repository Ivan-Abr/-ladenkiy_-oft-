import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function RadarChart(){
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Уничтожаем предыдущий график, если он существует
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            datasets: [
              {
                label: 'Dataset 1',
                data: [10, 20, 30, 40, 50],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
              },
            ],
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Уничтожаем график при размонтировании компонента
      }
    };
  }, []);

  return (<div id = "radarChart">
    <canvas ref={chartRef} />
    </div>);
};



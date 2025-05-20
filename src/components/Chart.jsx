import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // necessary to register charts automatically

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map((over) => `Over ${over.overNumber}`),
    datasets: [
      {
        label: 'Runs',
        data: data.map((over) => over.balls.reduce((acc, ball) => acc + ball.run, 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Wickets',
        data: data.map((over) => over.balls.filter((ball) => ball.isWicket).length),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default Chart;

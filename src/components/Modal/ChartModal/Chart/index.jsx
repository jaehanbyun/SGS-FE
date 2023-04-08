import React, { useState } from "react";
import styles from "./Chart.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [studyTime, setStudyTime] = useState([1.5, 4.4, 6, 2, 7, 9, 6]);
  const [studyDate, setStudyDate] = useState([
    "03-01",
    "03-02",
    "03-03",
    "03-04",
    "03-05",
    "03-06",
    "03-07",
  ]);
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          fontSize: 13,
        },
      },
      y: {
        grid: {},
      },
    },
    plugins: {
      title: {
        display: true,
        text: "일별 공부시간",
        size: 20,
      },
    },
  };
  const data = {
    labels: studyDate,
    datasets: [
      {
        type: "bar",
        label: "공부시간",
        data: studyTime,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "#36A2EB",
        color: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.container}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;

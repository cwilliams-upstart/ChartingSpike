import { Pie, Bar, Doughnut, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";

export default function ApexPage() {
  const [message, setMsg] = useState("");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels: ["Acura", "Audi", "BMW", "Chevrolet", "Ford"],
    datasets: [
      {
        label: "November",
        data: [43, 23, 55, 12, 33],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "October",
        data: [30, 40, 45, 50, 49],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  const chartRef = useRef(null);
  const onClick = (event: any) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    const element = getElementAtEvent(chart, event)[0];
    const idx = element.index;
    const datasetIdx = element.datasetIndex;
    const msg = `${data.datasets[datasetIdx].label} - ${data.labels[idx]} - ${data.datasets[datasetIdx].data[idx]} cars`;
    setMsg(msg);
  };

  return (
    <>
      <h1 className={styles.title}>
        <a target="_blank" href="https://react-chartjs-2.js.org/">Chart JS (React)</a>
      </h1>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <Bar data={data} options={options} />
        </div>
        <div className={styles.chart}>
          <Doughnut data={data} />
        </div>
        <div className={styles.chart}>
          <Pie ref={chartRef} onClick={onClick} data={data} />
        </div>
      </div>
      <h4><sup>*</sup>circle charts are clickable</h4>
      <h2 className={styles.title}>{message}</h2>
    </>
  );
}

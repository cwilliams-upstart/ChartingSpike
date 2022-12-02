import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ApexPage() {
  const [message, setMsg] = useState("");
  const bar = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Acura", "Audi", "BMW", "Chevrolet", "Ford"],
      },
    },
    series: [
      {
        name: "October",
        data: [30, 40, 45, 50, 49],
      },
      {
        name: "November",
        data: [60, 40, 65, 50, 69],
      },
    ],
  };

  const pie = {
    options: {
      labels: ["Acura", "Audi", "BMW", "Chevrolet", "Ford"],
      chart: {
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const msg = `${config.w.globals.labels[config.dataPointIndex]} - ${
              config.w.globals.series[config.dataPointIndex]
            } cars`;
            setMsg(msg);
          },
        },
      },
    },
    series: [44, 55, 41, 17, 15],
  };

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        <a target="_blank" rel="nofollow" href="https://apexcharts.com/docs/react-charts/">
          Apex Charts (React)
        </a>
      </h1>
      <div className={styles.chartContainer}>
        {isClient && (
          <div className={styles.chart}>
            <Chart
              options={bar.options}
              series={bar.series}
              type="bar"
              width="500"
            />
          </div>
        )}
        {isClient && (
          <div className={styles.chart}>
            <Chart
              options={pie.options}
              series={pie.series}
              type="donut"
              width="500"
            />
          </div>
        )}
        {isClient && (
          <div className={styles.chart}>
            <Chart
              options={pie.options}
              series={pie.series}
              type="pie"
              width="500"
            />
          </div>
        )}
      </div>
      <h4>
        <sup>*</sup>circle charts are clickable
      </h4>
      <h2 className={styles.title}>{message}</h2>
    </>
  );
}

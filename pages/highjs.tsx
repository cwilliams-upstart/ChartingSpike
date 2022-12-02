import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsDrilldown from "highcharts/modules/drilldown";

export default function HighChartPage() {
  useEffect(() => {
    if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
      HighchartsDrilldown(Highcharts);
    }
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        <a
          target="_blank"
          rel="nofollow"
          href="https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/"
        >
          High Charts (React)
        </a>
      </h1>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions('column')} />
        </div>
        <div className={styles.chart}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions('spline')} />
        </div>
        <div className={styles.chart}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions('pie')} />
        </div>
      </div>
    </>
  );
}

const chartOptions = (type: string) => {
  return {
    chart: {
      type,
      events: {
        select: function(e: any){
          alert('hi');
        },
        drilldown: {
          click: function(e: any){
            alert('hi');
          }
        },
      },
    },
    title: {
      text: "# of cars",
    },
    series: [
      {
        name: "#",
        data: [
          { name: "Audi", y: 45, drilldown: "Audi" },
          { name: "Acura", y: 33, drilldown: "Acura" },
          { name: "Bmw", y: 45, drilldown: "Bmw" },
          { name: "Chevrolet", y: 35, drilldown: "Chevrolet" },
          { name: "Ford", y: 25, drilldown: "Ford" },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: "Audi",
          id: "Audi",
          data: [
            ["S3", 2],
            ["RS4", 3],
            ["TT", 14],
          ],
        },
        {
          name: "Acura",
          id: "Acura",
          data: [
            ["RDX", 42],
            ["MDX", 3],
            ["TSX", 114],
          ],
        },
        {
          name: "BMW",
          id: "BMW",
          data: [
            ["M235i", 2],
            ["M3", 3],
            ["X7", 14],
          ],
        },
        {
          name: "Chevrolet",
          id: "Chevrolet",
          data: [
            ["CAMERO", 2],
            ["CORVETTE", 3],
          ],
        },
        {
          name: "Ford",
          id: "Ford",
          data: [
            ["MUSTANG", 2],
            ["GT", 3],
            ["FOCUS", 14],
          ],
        },
      ],
    },
  };
};

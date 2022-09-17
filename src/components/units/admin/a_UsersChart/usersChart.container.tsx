import UsersChartUI from "./usersChart.presenter";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { FETCH_USERS_COUNT_BY_DATE } from "./usersChart.queries";
import { useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import moment from "moment";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

export default function UsersChart() {
  const { data: countData } = useQuery<Pick<IQuery, "fetchUsersCountByDate">>(
    FETCH_USERS_COUNT_BY_DATE
  );
  console.log("userChart", countData);

  const labels = Array(countData?.fetchUsersCountByDate.length)
    .fill(0)
    .map((e, i) => moment().subtract(i, "d").format("YYYY/MM/DD"))
    .reverse();

  const datas = {
    labels,
    datasets: [
      {
        label: "신규 유저 가입 수",

        data: labels.map(
          (_, i) => countData?.fetchUsersCountByDate.at(i)?.countByDate
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log("userChart - datas", datas);

  return (
    <Line
      options={options}
      data={datas}
      // chart={chart}
      // number={number}
    />
  );
}

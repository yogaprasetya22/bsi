import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    scales,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { options } from "numeral";

ChartJS.register(ArcElement, Tooltip, Legend);

export const option = {
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
};

export function Charts({ data: dataLabel }) {
    const panding = dataLabel.filter((item) => item.status_id === 1).length;
    const approve = dataLabel.filter((item) => item.status_id === 2).length;
    const onProgres = dataLabel.filter((item) => item.status_id === 3).length;
    const done = dataLabel.filter((item) => item.status_id === 4).length;
    const reject = dataLabel.filter((item) => item.status_id === 5).length;
    const data = {
        labels: ["Panding", "Approve", "On Progres", "Done", "Reject"],
        datasets: [
            {
                label: "upload",
                data: [panding, approve, onProgres, done, reject],
                backgroundColor: [
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 92, 1)",
                    "rgba(153, 12, 25, 1)",
                ],
                borderColor: [
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 92, 1)",
                    "rgba(153, 12, 25, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={data} options={option} />;
}

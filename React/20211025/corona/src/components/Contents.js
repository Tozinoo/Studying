import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

const Contents = () => {
    const [confirmedData, setConfirmedData] = useState({
        labels: ["1월", "2월", "3월"],
        datasets: [
            {
                label: "국내 누적 확진자",
                backgroundColor: "salmon",
                fill: true,
                data: [10, 5, 3],
            },
        ],
    });
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get(
                "https://api.covid19api.com/total/dayone/country/kr"
            );
            makeData(res.data);
        };
        const makeData = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(
                    (a) => a.year === year && a.month === month
                );

                if (!findItem) {
                    acc.push({
                        year,
                        month,
                        date,
                        confirmed,
                        active,
                        death,
                        recovered,
                    });
                }
                if (findItem && findItem.date < date) {
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.month = month;
                    findItem.year = year;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }
                return acc;
            }, []);
            console.log(arr);
        };
        fetchEvents();
    }, []);

    const options = {
        plugins: {
            title: { display: true, text: "누적 확진자 추이", fontSize: 16 },
            legend: { display: true, position: "bottom" },
        },
    };
    return (
        <section>
            <h2>국내 코로나 현황</h2>
            <div className="contents">
                <div>
                    <Bar data={confirmedData} options={options} />
                </div>
            </div>
        </section>
    );
};

export default Contents;

import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "moisture",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  const getData = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + "/get-moisture-data";
    await axios.get(url).then((res) => {
      let labels = [];
      let data = [];
      res.data.forEach((element) => {
        labels.push(element.timeStamp);
        data.push(element.moisture);
      });
      setData({
        labels: labels,
        datasets: [
          {
            label: "moisture",
            data: data,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
          },
        ],
      });
    });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <LineChart chartData={data} />
      </div>
    </div>
  );
}

export default App;

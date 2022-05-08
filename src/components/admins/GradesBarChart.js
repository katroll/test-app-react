import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";
  

function GradesBarChart({ quiz }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getBarChartGrades();
  }, [])

  function getBarChartGrades() {
    fetch("https://morning-scrubland-82075.herokuapp.com/bar_chart_grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            key: "04af711a-ca6c-11ec-9d64-0242ac120002"
        },
        body: JSON.stringify({quiz_id: quiz.id})
    })
    .then(resp => resp.json())
    .then(data => setGrades(data))
  }

  console.log(grades);

    return (
      <BarChart
        width={500}
        height={300}
        data={grades}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: "Score", position: "center", dy: 10, fill: "#1f57be"}} />
        <YAxis allowDecimals={false} label={{ value: "Number of Students", position: "center", angle: -90,   dy: -10, fill: "#1f57be"}} />
        <Tooltip />
        <Bar dataKey="students" fill="#1f57be" />
      </BarChart>
    );
  }

  export default GradesBarChart;
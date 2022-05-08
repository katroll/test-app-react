import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
  

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

    return (
      <div className="flex flex-col items-center w-full">
        <h1 className="py-2 text-center text-xl font-semibold">Histogram of Student Scores</h1>
        <BarChart
          width={1000}
          height={300}
          data={grades}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: "Score", position: "insideLeft", dy: 20, dx: 30}}  />
          <YAxis allowDecimals={false} label={{ value: "Number of Students", position: "center", angle: -90,   dy: -10}} />
          <Tooltip />
          <Bar dataKey="first_attempt" fill="#95d6f5" />
          <Bar dataKey="last_attempt" fill="#1f57be" />
          <Legend />
        </BarChart>
      </div>
    );
  }

  export default GradesBarChart;
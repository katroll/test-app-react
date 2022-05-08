import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
  

function IncorrectAnswerBarChart({ quiz }) {
  const [results, setResults] = useState([]);

  console.log(quiz)

  useEffect(() => {
    getBarChartGrades();
  }, [])

  function getBarChartGrades() {
    fetch("https://morning-scrubland-82075.herokuapp.com/incorrect_answer_bar_chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            key: "04af711a-ca6c-11ec-9d64-0242ac120002"
        },
        body: JSON.stringify({quiz_id: quiz.id})
    })
    .then(resp => resp.json())
    .then(data => setResults(data))
  }

    return (
      <div className="flex flex-col items-center w-full py-5">
        <h1 className="py-2 text-center text-xl font-semibold">Histogram of Incorrect Answers of {quiz.grades.length} Total Attempts</h1>
        <BarChart
          width={1000}
          height={300}
          data={results}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="number" label={{ value: "Question Number", position: "insideLeft", dy: 17, dx: 30}}  />
          <YAxis allowDecimals={false} label={{ value: "Number of Incorrect Answers", position: "center", angle: -90,   dy: -10, dx: -10}} />
          <Tooltip />
          <Bar dataKey="count" fill="#95d6f5" />
        </BarChart>
      </div>
    );
  }

  export default IncorrectAnswerBarChart;
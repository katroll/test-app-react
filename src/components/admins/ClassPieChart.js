import { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

function ClassPieChart() {
    const [classEnrollmentData, setClassEnrollemtData] = useState([]);

      useEffect(() => {
          getClassEnrollmentCount();
      }, []);

      function getClassEnrollmentCount() {
        fetch("https://morning-scrubland-82075.herokuapp.com/class_enrollment_count", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then(resp => resp.json())
        .then(data => setClassEnrollemtData(data))
      }

      const COLORS = ["#1f57be", "#95d6f5", "#4CAF50"];

    return (
        <div className='w-1/2'>
            <div className='flex flex-col items-center bg-th-card-bg p-2 rounded-md'>
                <h1 className='w-full text-center text-xl font-semibold'>Class Enrollment</h1>
                <PieChart width={400} height={250}>
                    <Pie
                        dataKey="value"
                        data={classEnrollmentData}
                        isAnimationActive={false}
                        cx={200}
                        cy={120}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {classEnrollmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                        wrapperStyle={{ bottom: 0 }}
                    />
                </PieChart>
            </div>
        </div>
    )
}

export default ClassPieChart;
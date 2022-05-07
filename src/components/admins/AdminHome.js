import { useEffect, useState } from "react";
import ExportAll from "./ExportAll";
import ClassPieChart from "./ClassPieChart";
import EnrollmentLineChart from "./EnrollmentLineChart";

function AdminHome() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("https://morning-scrubland-82075.herokuapp.com/grades", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate);
        });
    }, [])


    return (
        <div className="pt-10 pl-12 flex flex-col justify-start">
            <div className="flex flex-col justify-start">
            <div className="mb-5">
                <h1 className="text-4xl text-th-title-text font-bold mb-5">Shortcut Actions</h1>
                <ExportAll />
            </div>
            <h1 className="text-4xl text-th-title-text font-bold mb-5">Recently Taken Tests</h1>
            <div className="flex bg-th-card-bg rounded-md p-5 mr-5 mb-5">
                <div className="flex flex-col h-[40vh] overflow-y-scroll ml-5 border-l pl-5">
                    {grades.map(grade => {
                        return (
                            <div key={grade.id} className="flex py-2 bg-th-light-blue-bg my-1 px-2 rounded">
                                <div className="mx-2 py-1">{grade.user.first_name} {grade.user.last_name}</div>
                                <div className="bg-light-blue border-l border-yellow px-3 py-1 mx-1">{grade.quiz_data.quiz.name}</div>
                                <div className="bg-light-blue border-l border-yellow px-3 py-1 mx-1">{grade.score}/{grade.results.length}</div>
                                <div className="bg-light-blue border-l border-yellow px-3 py-1 mx-1">{grade.updated_at.slice(0,10)} at {grade.updated_at.slice(11, 19)}</div>

                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="pr-5">
                <h1 className="text-4xl text-th-title-text font-bold mb-5">Charts</h1>
                <div className="w-full flex justify-around space-x-3"> 
                    <EnrollmentLineChart />
                    <ClassPieChart />
                </div>
            </div>

            </div>
         
           
        </div>
    )

}

export default AdminHome;
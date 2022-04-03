import { useEffect, useState } from "react";
import ExportAll from "./ExportAll";

function AdminHome() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("https://morning-scrubland-82075.herokuapp.com/grades")
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate.slice(0, 5));
        });
    }, [])


    return (
        <div className="pt-10 pl-12 flex flex-col justify-start">
            <div className="flex flex-col justify-start">
            <div className="mb-5">
                <h1 className="text-4xl text-th-title-text font-bold mb-5">Shortcut Actions</h1>
                <ExportAll />
            </div>
            <h1 className="text-4xl text-th-title-text font-bold mb-10">This Weeks Activity</h1>
            <div className="flex bg-th-card-bg rounded-md p-5 mr-5">
                <div className="text-slate-800 text-lg">Recently Taken Tests</div>
                <div className="flex flex-col ml-5 border-l pl-5">
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

            </div>
         
           
        </div>
    )

}

export default AdminHome;
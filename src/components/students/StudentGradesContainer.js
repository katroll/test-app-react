import StudentGrades from "../StudentGrades";

import { useContext } from "react";
import { UserContext } from "../../context/User";


function StudentGradesContainer() {
    const user = useContext(UserContext).user;

    return (
        <div className="pt-5 flex w-full">
            <div className="flex flex-col items-center w-full">
                <p className="font-bold text-4xl text-th-title-text">My Test Scores</p>
                <StudentGrades user={user} height={"max-h-[80vh]"}/>
            </div>
        </div>
    )
}

export default StudentGradesContainer;


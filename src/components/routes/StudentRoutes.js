import { Routes, Route } from "react-router-dom"

import TestList from '../TestList';
import QuizTaker from '../students/QuizTaker';
import StudentGradesContainer from '../students/StudentGradesContainer';
import StudentHome from '../students/StudentHome';


function StudentRoutes({ setTakingQuiz, takingQuiz }) {

    return (
        <div className="pl-60">
            <Routes>
                <Route path={`/test/:name`} 
                    element={<QuizTaker setTakingQuiz={setTakingQuiz} takingQuiz={takingQuiz} />}
                />
                <Route exact path={`/tests/:category`} 
                    element={<TestList />}
                    />
                <Route path={`/mygrades`}  
                    element={<StudentGradesContainer />}
                />
                <Route path={`/`} 
                    element={<StudentHome />}
                />
            </Routes>
        </div>
    )
}

export default StudentRoutes;
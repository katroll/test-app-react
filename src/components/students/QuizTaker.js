import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { QuizzesContext } from "../../context/Quizzes";
import { UserContext } from "../../context/User";

import Questions from "./Questions";

function QuizTaker({ setTakingQuiz, takingQuiz }) {
    const quizzes = useContext(QuizzesContext).quizzes;
    const userContext = useContext(UserContext);
    const { name } = useParams();

    const [startTime, setStartTime] = useState("");

    const quiz = quizzes.find(quiz => quiz.name === name);

    function handleSubmitScore(results, score) {
        fetch("https://morning-scrubland-82075.herokuapp.com/grades", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              key: "04af711a-ca6c-11ec-9d64-0242ac120002"
          },
            body: JSON.stringify({user_id: userContext.user.id, quiz_id: quiz.id, results: results, score: score, start_time: startTime})
          })
          .then(resp => resp.json())
          .then(grade => {
            const updatedGrades = [...userContext.user.grades, grade];
            userContext.setValue({...userContext.user, grades: updatedGrades});
          }) 
    }

    function handleStartTest() {
      setTakingQuiz(true);
      setStartTime(new Date());
    }

    
    

    if(!quiz) {
        return (
          <div className="flex justify-center items-center mt-20 bg-th-primary w-full h-full">
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
      }


    return (
        <div className="flex flex-col w-full pt-10 items-center">
            <h1 className="text-4xl text-th-title-text font-bold">{quiz.name}</h1>
            {takingQuiz ? (
                <div className="flex flex-col w-screen items-center">
                    <Questions questions={quiz.questions} onSubmitScore={handleSubmitScore} setTakingQuiz={setTakingQuiz}/> 
                </div>
            ) : (
                <div className="flex flex-col mt-10">
                    <p>This test has {quiz.questions.length} questions. When you are ready to begin click the button below.</p>
                    <button 
                        type="button" 
                        className="justify-end mt-5 mb-5 text-th-light-text bg-th-button rounded hover:bg-th-green-button-hover text-md font-semibold px-5 py-2.5 text-center"
                        onClick={handleStartTest}>
                            Begin Test
                    </button>
                </div>
                
            )}
        </div>
    )
}

export default QuizTaker;
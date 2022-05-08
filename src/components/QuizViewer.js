import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react"
import { QuizzesContext } from "../context/Quizzes";
import { UserContext } from "../context/User";

import GradesBarChart from "./admins/GradesBarChart";


function QuizViewer() {
    const quizzes = useContext(QuizzesContext).quizzes;
    const user = useContext(UserContext).user;

    const { name } = useParams();
    const quiz = quizzes.find(quiz => quiz.name.replace(/\s+/g, '') === name.replace(/\s+/g, ''));

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if(!user.admin) {
            if(user.grades.length > 0) {
                setAnswers(user.grades[user.grades.length - 1].results)
            }
        } else {
            if(quiz) {
                const correct = quiz.questions.map(question => question.answer)
                setAnswers(correct);
            }
        }
    
    }, [user, quiz]);

    if(answers.length === 0 || !quiz) {
        return (
          <div className="flex justify-center items-center mt-20 bg-th-primary w-full h-full">
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
      }

    return (
        <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-12 pr-10">
            <h1 className="text-4xl text-th-title-text font-bold uppercase tracking-wider">{user.admin ? `${quiz.name}` : "Results"}</h1>

            <div className="w-full">
                {user.admin? (
                    <div className="flex justify-start w-full mt-5 bg-th-card-bg rounded-md">
                        <GradesBarChart quiz={quiz}/>
                    </div>
                ) : null}
            </div>
            <ul className="flex flex-col justify-start mt-5 w-full">
                {quiz.questions.map((question, i) => {
                    return (
                        <li key={`${question.question}-${question.number}`} className="mb-3">
                            <div className="flex flex-col w-full p-2 bg-th-card-bg items-center border-2 rounded border-th-light-blue-bg">
                                {question.imageUrl ? (
                                    <img
                                        src={question.imageUrl}
                                        alt="question pic"
                                        className="max-h-[50vh] max-w-3/4 mb-8 mt-2 rounded">
                                    </img>
                                ) : null }
                                <div className="flex flex-col justify-start pb-2 pt-2">
                                    <div className="flex flex-row">
                                        {!user.admin && quiz.kind === "quiz" ? (
                                             <div>{question.answer === answers[i] ? (
                                                <div className="text-2xl mr-2 text-th-correct">✔</div>
                                                ) : (
                                                <div className="text-xl mr-2">❌</div>
                                                )}
                                             </div>
                                        ) : null } 
                                        <p className="font-bold mr-3 text-stone-800">{`${question.number}.`}</p>
                                        <div className="felx flex-col mb-2">
                                            <p className="text-stone-800">{question.question}</p>
                                            <p className="text-stone-800 mt-2">{question.bengali}</p>
                                        </div>  
                                    </div>
                
                                    <div className="flex flex-col pl-16">
                                        {question.choices.map((choice, index) => {
                                            return (
                                                <div key={choice} className="">
                                                    <input type="radio" id={choice} name={`${question.question}-${question.number}`} checked={answers[i] === index ? true : false} readOnly></input>
                                                    <label className="pl-1 text-stone-800">{choice}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuizViewer;
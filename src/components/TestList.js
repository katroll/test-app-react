import { useParams } from "react-router-dom"
import { useContext } from "react"
import { QuizzesContext } from "../context/Quizzes"
import QuizTable from "./QuizTable"


function TestList() {
    const quizzes = useContext(QuizzesContext).quizzes;
    const { category } = useParams();

    const filteredQuizzes = quizzes.filter(quiz => quiz.category === category)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="flex flex-col pt-10 pl-12 items-center">
            <h1 className="text-4xl text-th-title-text font-bold">{capitalizeFirstLetter(category)} Tests</h1>

            <QuizTable quizzes={filteredQuizzes} />

        </div>
    )
}

export default TestList;
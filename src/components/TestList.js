import { useParams } from "react-router-dom"
import { useContext } from "react"
import { QuizzesContext } from "../context/Quizzes"
import QuizTable from "./QuizTable"


function TestList() {
    const quizzes = useContext(QuizzesContext).quizzes;
    const { category } = useParams();

    const filteredQuizzes = quizzes.filter(quiz => quiz.category === category)
    const sortedQuizzes = filteredQuizzes.sort((a,b) => (a.name > b.name) ? 1 : -1);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {filteredQuizzes.length > 0 ? (
                    <div className="flex flex-col w-full pt-10 pl-12 items-center">
                        <h1 className="text-4xl text-th-title-text font-bold">{capitalizeFirstLetter(category)} Tests</h1>

                        <QuizTable quizzes={sortedQuizzes} />

                    </div>
            ) : (
                <div className="flex flex-col w-full pt-10 pl-12 items-center">
                    <h1 className="text-4xl text-th-title-text font-bold">There are no {category} tests or quizzes yet.</h1>
                </div>
            )}
       </>
    )
}

export default TestList;
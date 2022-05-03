import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { QuizzesContext } from "../context/Quizzes"
import QuizTable from "./QuizTable"
import { UserContext } from "../context/User"
import { useState } from "react"


function TestList() {
    let quizzes = useContext(QuizzesContext).quizzes;
    //let setQuizzes = useContext(QuizzesContext).setValue;
    const user = useContext(UserContext).user;
    const { category } = useParams();

    const [quizzesToDisplay, setQuizzesToDisplay] = useState(quizzes);

    function allStudentsTests() {
        let allTests = [];
        user.spctc_classes.forEach(spctc_class => {
            allTests = [...allTests, ...spctc_class.quizzes]
        })
        return allTests;
    }

    useEffect(() => {
        if(!user.admin) {
            const studentsQuizzes = quizzes.filter(quiz => {
                if(allStudentsTests().find(test => test.name === quiz.name)) {
                    return true;
                }
                return false;
            })
            setQuizzesToDisplay(studentsQuizzes);
        } else {
            setQuizzesToDisplay([...quizzes]);
        }

    }, [user, quizzes])

    const filteredQuizzes = quizzesToDisplay.filter(quiz => quiz.category === category)
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
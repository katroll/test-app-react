import { NavLink } from "react-router-dom"

import { useContext } from "react"
import { UserContext } from "../context/User"


function QuizTable({ quizzes }) {

    const user = useContext(UserContext).user;

    return (

            <div className="">
                <div className="flex flex-col mt-8 max-h-[80vh]">
                    <div className="py-2 my-2  overflow-x-auto overflow-y-scroll sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-th-border shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left uppercase border-b border-th-border bg-th-table-header-bg text-th-light-text">
                                            Test
                                        </th>
                                        {user.admin ? (
                                            <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left uppercase border-b border-th-border bg-th-table-header-bg text-th-light-text">
                                                Date Created
                                            </th>
                                        ) : null}
                                        <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left uppercase border-b border-th-border bg-th-table-header-bg text-th-light-text">
                                            {user.admin? "Times Taken" : "Completed"}
                                        </th>
                                        {!user.admin ? (
                                            <>
                                                <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left uppercase border-b border-th-border bg-th-table-header-bg text-th-light-text">
                                                    Grade
                                                </th>
                                                <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left uppercase border-b border-th-border bg-th-table-header-bg text-th-light-text">
                                                    Date
                                                </th>
                                            </>
                                        ) : null}
                                    </tr>
                                </thead>

                                <tbody className="bg-th-card-bg">
                                    {quizzes.map((quiz, index) => {
                                        return (
                                            <tr key={quiz.id}>
                                                <td className="px-6 py-4 border-b border-th-border">
                                                    <NavLink
                                                        to={`/test/${quiz.name}`}
                                                        className="text-sm leading-5"
                                                        value={index}>
                                                            {quiz.name}
                                                    </NavLink>
                                                </td>
                                                {user.admin ? (
                                                    <>
                                                        <td className="px-6 py-4 border-b border-th-border">
                                                            {quiz.created_at.slice(0,10)}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-th-border">
                                                            {quiz.grades.length}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        {user.grades.find(grade => grade.quiz_data.quiz.id === quiz.id) ? (
                                                            <>
                                                                <td className="text-xl border-b border-th-border text-center">✔</td> 
                                                                <td className="text-sm border-b border-th-border text-center">{user.grades.find(grade => grade.quiz_data.quiz.name === quiz.name).score}/{quiz.questions.length}</td> 
                                                                <td className="text-sm px-5 border-b border-th-border text-center">{user.grades.find(grade => grade.quiz_data.quiz.name === quiz.name).updated_at.slice(0,10)}</td> 
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="text-xl border-b border-th-border text-center">-</td> 
                                                                <td className="text-xl border-b border-th-border text-center">-</td>
                                                                <td className="text-xl border-b border-th-border text-center">-</td>
                                                            </>
                                                        )}    
                                                    </>
                                                )}
                                            </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
   
    )

}

export default QuizTable;
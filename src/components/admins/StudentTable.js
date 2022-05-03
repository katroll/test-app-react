import { useState, useContext } from "react";
import { UsersContext } from "../../context/Users";
import { QuizzesContext } from "../../context/Quizzes";

function StudentTable({ setPopUp, setSelectedUser }) {
    const students = useContext(UsersContext).users.filter(user => !user.admin).sort((a,b) => (b.first_name.toLowerCase() < a.first_name.toLowerCase()) ? 1 : ((a.first_name.toLowerCase() < b.first_name.toLowerCase()) ? -1 : 0));
    const quizzes = useContext(QuizzesContext).quizzes;

    const [nameSearch, setNameSearch] = useState(""); 
    const [usernameSearch, setUsernameSearch] = useState(""); 

    function onUserClick(user) {
        setPopUp(true);
        setSelectedUser(user);
    }

    function handleStudentSearch(e) {
        if(e.target.name === "name") {
            setNameSearch(e.target.value);
        } else {
            setUsernameSearch(e.target.value);
        }
    }

    function filterStudents() {
        const filteredStudents =  students.filter(student => {
            return ((student.first_name.toLowerCase().includes(nameSearch.toLowerCase()) || student.last_name.toLowerCase().includes(nameSearch.toLowerCase())) && student.username.toLowerCase().includes(usernameSearch.toLowerCase()))
        })
        return filteredStudents;
    }


    return (
        <div>
            <div className="flex w-full pl-5 py-2 bg-th-secondary rounded">
                <form>
                    <label className="text-th-light-text">Search For A Student:</label>
                    <input
                        type="text"
                        placeholder="Student's Name"
                        name="name"
                        className="mx-3 pl-3 rounded focus:outline-none"
                        onChange={handleStudentSearch}
                        value={nameSearch}
                    />
                    <label className="text-th-light-text">OR</label>
                    <input
                        type="text"
                        placeholder="Student's Username"
                        name="username"
                        className="mx-3 pl-3 rounded focus:outline-none"
                        onChange={handleStudentSearch}
                        value={usernameSearch}
                    />
                </form>
            </div>
            <div className="mt-2 overflow-x-scroll overflow-y-scroll">
                <div className="flex flex-col max-h-[70vh] max-w-[75vw]">
                    <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-th-border shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-xs text-left text-th-light-text tracking-wider border-th-border bg-th-table-header-bg uppercase font-semibold">
                                            <div className="w-40">Name</div>
                                        </th>
                                        <th className="px-6 py-3 border-b text-xs text-left text-th-light-text tracking-wider border-th-border bg-th-table-header-bg uppercase font-semibold">
                                            <div className="w-40">Username</div>
                                        </th>
                                        {quizzes.map(quiz => {
                                            return (
                                                <th key={quiz.id} className="px-6 py-3 text-xs font-medium w-48 leading-4 tracking-wider text-left text-th-light-text uppercase border-b border-th-border bg-th-table-header-bg">
                                                   <div className="w-36 font-semibold"> {quiz.name}</div>
                                                </th>
                                            )
                                        })}
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-th-border bg-th-table-header-bg">
                                        <div className="w-24 text-th-light-text">Tests Taken</div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-th-card-bg">
                                    {filterStudents().map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <button 
                                                        className="text-sm leading-5 text-gray bg-th-card-bg"
                                                        onClick={() => onUserClick(user)}>
                                                            {user.first_name} {user.last_name}
                                                    </button>
                                                </td>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <div className="text-sm leading-5 text-gray bg-th-card-bg">
                                                            {user.username}
                                                    </div>
                                                </td>
                                                {quizzes.map(quiz => {
                                                    return (
                                                        <td key={quiz.id} className="px-6 py-4 whitespace-no-wrap border-b border-th-border">
                                                            <div className="text-sm leading-5 text-gray">{user.grades.find(grade => grade.quiz_data.quiz.id === quiz.id) ? `${user.grades.find(grade => grade.quiz_data.quiz.id === quiz.id).score}/${quiz.questions.length}` : "-" }</div>
                                                        </td>
                                                    )
                                                })}

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-th-border">
                                                    <div className="text-sm leading-5 text-gray">{user.grades.length}</div>
                                                </td>
                                            </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )

}

export default StudentTable;
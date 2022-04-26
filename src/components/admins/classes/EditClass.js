import { useState, useContext } from "react";
import { QuizzesContext } from "../../../context/Quizzes"
import { UsersContext } from "../../../context/Users"


function EditClass({ classes, fetchClasses, onMouseEnterButton, onMouseLeaveButton }) {
    const students = useContext(UsersContext).users.filter(user => !user.admin).sort((a,b) => (b.first_name.toLowerCase() < a.first_name.toLowerCase()) ? 1 : ((a.first_name.toLowerCase() < b.first_name.toLowerCase()) ? -1 : 0));
    const tests = useContext(QuizzesContext).quizzes;
    const [editClass, setEditClass] = useState(false);
    const [classToEdit, setClassToEdit] = useState({
        class: {},
        studentsToAdd: [],
        testsToAdd: []
    })

    function fullName(user) {
        return `${user.first_name} ${user.last_name}`
    }

    function currentTests() {
        return [...classToEdit.testsToAdd, ...(classToEdit.class.quizzes ? classToEdit.class.quizzes: [])].map(test => test.name);
    }

    function currentStudents() {
        return [...classToEdit.studentsToAdd, ...(classToEdit.class.users ? classToEdit.class.users : [])].map(student => fullName(student));
    }

    const testsInDropdown = tests.filter(test => !currentTests().includes(test.name));
    const studentsInDropdown = students.filter(student => !currentStudents().includes(fullName(student)));


    function findById(id, arrayToSearch) {
        if(arrayToSearch === "students") {
            return students.find(element => element.id === id);
        }
        if(arrayToSearch === "tests") {
            return tests.find(element => element.id === id);
        }
        if(arrayToSearch === "classes") {
            return classes.find(element => element.id === id);
        }
    }

    function handleClassEditChanges(e) {
        if(e.target.value === "") {
            return;
        }

        const key = e.target.name;
        const id = parseInt(e.target.value);

        if(key === "studentsToAdd") {
            const students = [...classToEdit.studentsToAdd, findById(id, "students")];
            setClassToEdit({...classToEdit, studentsToAdd: students});
            return;
        }
        if(key === "testsToAdd") {
            const tests = [...classToEdit.testsToAdd, findById(id, "tests")];
            setClassToEdit({...classToEdit, testsToAdd: tests});
            return;
        }
        if(key === "class") {
            setClassToEdit({...classToEdit, class: findById(id, "classes")});
        }
    }

    function handleSubmitEditClass(e) {
        e.preventDefault();

        if(classToEdit.studentsToAdd.length > 0) {
            handleEditClass("users_classes", "user_id", classToEdit.studentsToAdd);
        }
        if(classToEdit.testsToAdd.length > 0) {
            handleEditClass("quizzes_classes", "quiz_id", classToEdit.testsToAdd);
        }

        setClassToEdit({
            class: {},
            studentsToAdd: [],
            testsToAdd: []
        });
    }

    function handleEditClass(table, elementId, updateArray) {
        const allFetches = updateArray.map(element => {
            return fetch(`https://morning-scrubland-82075.herokuapp.com/${table}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({spctc_class_id: classToEdit.class.id, [elementId]: element.id})
            })
            .then(resp => resp.json())
        }) 

        Promise.all(allFetches).then(resp => {
            fetchClasses();
          })
          .then(resp => setEditClass(false))
    }


    function toggleEditClass() {
        setEditClass(!editClass);
    }

    console.log(classes)

    return (
        <div className="flex flex-col w-full items-start">
            <button
                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
                className="flex items-center pl-10 mb-3 text-2xl font-bold text-th-title-text"
                onClick={toggleEditClass}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px"
                        viewBox="0 0 172 172"
                        className="w-5 h-5 mr-3"
                        style={{fill:"#000000"}}>
                            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{"mixBlendMode": "normal"}}>
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#1f57be">
                                    <path d="M148.35,6.88c-4.28656,0 -8.55969,1.67969 -11.825,4.945l-2.795,2.795l23.65,23.65c-0.01344,0.01344 2.795,-2.795 2.795,-2.795c6.54406,-6.54406 6.53063,-17.11937 0,-23.65c-3.27875,-3.26531 -7.53844,-4.945 -11.825,-4.945zM128.4625,20.7475c-0.77937,0.1075 -1.505,0.49719 -2.0425,1.075l-111.585,111.6925c-0.44344,0.40313 -0.77937,0.92719 -0.9675,1.505l-6.88,25.8c-0.30906,1.1825 0.04031,2.43219 0.90031,3.29219c0.86,0.86 2.10969,1.20938 3.29219,0.90031l25.8,-6.88c0.57781,-0.18812 1.10188,-0.52406 1.505,-0.9675l111.6925,-111.585c1.37063,-1.33031 1.38406,-3.52062 0.05375,-4.89125c-1.33031,-1.37062 -3.52062,-1.38406 -4.89125,-0.05375l-111.0475,111.0475l-13.975,-13.975l111.0475,-111.0475c1.03469,-0.99437 1.34375,-2.53969 0.76594,-3.85656c-0.57781,-1.31687 -1.90812,-2.13656 -3.34594,-2.05594c-0.1075,0 -0.215,0 -0.3225,0z"></path>
                                </g>
                            </g>
                    </svg>
                    <p>Edit Class</p>
            </button>
            {editClass ? (
                <div className="flex w-full justify-start mb-3 pl-10 py-3 bg-th-card-bg">
                    <form 
                        className="flex w-full items-start justify-start space-y-2 justify-center divide-x divide-th-border"
                        onSubmit={handleSubmitEditClass}
                    >
                        <div className="flex flex-col w-2/5">
                            <div className="flex w-full space-x-2">
                                <label>Select Class to Edit: </label>
                                <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="class" onChange={handleClassEditChanges}>
                                    <option value="">Select</option>
                                    {classes.map(spctc_class => {
                                        return (
                                            <option key={`${spctc_class.name}-${spctc_class.id}`} value={spctc_class.id}>{spctc_class.name}</option>
                                        )
                                    })}
                                </select> 
                            </div>
                            {classToEdit.class.name ? (
                                <div className="flex flex-col space-y-2 mt-2">
                                    <div className="flex w-full space-x-2">
                                        <label>Select Students to Add: </label>
                                        <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="studentsToAdd" onChange={handleClassEditChanges}>
                                            <option value="">Select</option>
                                            {studentsInDropdown.map(student => {
                                                return (
                                                    <option key={`${student.first_name}-${student.id}`} value={student.id}>{student.first_name} {student.last_name}</option>
                                                )
                                            })}
                                        </select> 
                                    </div>
                                    <div className="flex w-full space-x-2">
                                        <label>Select Tests to Add: </label>
                                        <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="testsToAdd" onChange={handleClassEditChanges}>
                                            <option value="">Select</option>
                                            {testsInDropdown.map(test => {
                                                return (
                                                    <option key={`${test.name}-${test.id}`} value={test.id}>{test.name}</option>
                                                )
                                            })}
                                        </select> 
                                    </div>
                                </div>
                            ) : null }
                        </div>
                    <div className="flex flex-col pl-3 w-2/3 justify-between">
                        {classToEdit.class.name ? (
                            <p className="font-semibold">Editing {classToEdit.class.name}...</p>
                        ) : null}
                        {classToEdit.studentsToAdd.length > 0 ? (
                            <div className="flex space-x-2">
                                <p>Add these students:</p>
                                <div className="flex flex-col">
                                    {classToEdit.studentsToAdd.map(student => {
                                        return (
                                            <p key={`${student.first_name}-${student.id}`}>{`${student.first_name} ${student.last_name}`}</p>
                                        )
                                    })}
                                </div>
                        </div>
                        ) : null}
                        {classToEdit.testsToAdd.length > 0 ? (
                            <div className="flex space-x-2">
                                <p>Add these tests:</p>
                                <div className="flex flex-col">
                                    {classToEdit.testsToAdd.map(test => {
                                        return (
                                            <p key={`${test.name}-${test.id}`}>{test.name}</p>
                                        )
                                    })}
                                </div>
                        </div>
                        ) : null}
                        {classToEdit.testsToAdd.length > 0 || classToEdit.studentsToAdd.length > 0 ? (
                            <div className="flex w-full justify-center">
                                <button 
                                    type="submit"
                                    className="p-1 w-1/4 bg-th-title-text text-th-light-text rounded">
                                        Update Class
                                </button>
                            </div>
                        ) : null }
                    </div>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default EditClass;
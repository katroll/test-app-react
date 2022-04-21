import { useState, useContext } from "react";
import { QuizzesContext } from "../../../context/Quizzes"
import { UsersContext } from "../../../context/Users"


function EditClass({ classes, fetchClasses }) {
    const students = useContext(UsersContext).users.filter(user => !user.admin).sort((a,b) => (b.first_name.toLowerCase() < a.first_name.toLowerCase()) ? 1 : ((a.first_name.toLowerCase() < b.first_name.toLowerCase()) ? -1 : 0));
    const tests = useContext(QuizzesContext).quizzes;
    const [editClass, setEditClass] = useState(false);
    const [classToEdit, setClassToEdit] = useState({
        class: {},
        studentsToAdd: [],
        testsToAdd: []
    })

    function findStudentById(id) {
        return students.find(student => student.id === id);
    }

    function findTestById(id) {
        return tests.find(test => test.id === id);
    }

    function findClassById(id) {
        return classes.find(spctc_class => spctc_class.id === id)
    }

    function handleClassEditChanges(e) {
        const key = e.target.name;
        const id = parseInt(e.target.value);
        
        if(key === "studentsToAdd") {
            const students = [...classToEdit.studentsToAdd, findStudentById(id)];
            setClassToEdit({...classToEdit, studentsToAdd: students});
            return;
        }
        if(key === "testsToAdd") {
            const tests = [...classToEdit.testsToAdd, findTestById(id)];
            setClassToEdit({...classToEdit, testsToAdd: tests});
            return;
        }
        setClassToEdit({...classToEdit, class: findClassById(id)})
    }

    function handleSubmitEditClass(e) {
        if(classToEdit.studentsToAdd.length > 0) {
            handleEditClass("students");
        }
        if(classToEdit.testsToAdd.length > 0) {
            handleEditClass("tests");
        }
    }

    function handleEditClass(typeOfEdit) {
        let path;
        let elementId;
        let updateArray;

        if(typeOfEdit === "students") {
            path = "users_classes";
            elementId = "user_id";
            updateArray = classToEdit.studentsToAdd;
        } 

        if(typeOfEdit === "tests") {
            path = "quizzes_classes";
            elementId = "quiz_id";
            updateArray = classToEdit.testsToAdd;
        } 

        const allFetches = updateArray.map(element => {
            return fetch(`https://morning-scrubland-82075.herokuapp.com/${path}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({spctc_class_id: classToEdit.class.id, [elementId]: element.id})
            })
            .then(resp => resp.json())
        }) 

        Promise.all(allFetches).then(resp => {
            fetchClasses();
          })
    }


    function toggleEditClass() {
        setEditClass(!editClass);
    }


    return (
        <div className="flex flex-col w-full items-start">
            <button
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
                <div className="flex w-full justify-start mb-3 pl-10 py-3 bg-th-card-bg divide-x divide-th-border">
                    <form 
                        className="flex flex-col w-2/5 items-start justify-start space-y-2 justify-center"
                    >
                        <div className="flex w-full space-x-2">
                            <label>Select Class to Edit: </label>
                            <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="class" onChange={handleClassEditChanges}>
                                <option value={null}>Select</option>
                                {classes.map(spctc_class => {
                                    return (
                                        <option key={`${spctc_class.name}-${spctc_class.id}`} value={spctc_class.id}>{spctc_class.name}</option>
                                    )
                                })}
                            </select> 
                        </div>
                        {classToEdit.class.name ? (
                            <div className="flex flex-col space-y-2">
                                <div className="flex w-full space-x-2">
                                    <label>Select Students to Add: </label>
                                    <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="studentsToAdd" onChange={handleClassEditChanges}>
                                        <option>Select</option>
                                        {students.map(student => {
                                            return (
                                                <option key={`${student.first_name}-${student.id}`} value={student.id}>{student.first_name} {student.last_name}</option>
                                            )
                                        })}
                                    </select> 
                                </div>
                                <div className="flex w-full space-x-2">
                                    <label>Select Tests to Add: </label>
                                    <select className="p-1 w-1/3 text-sm outline-none border border-th-border rounded" name="testsToAdd" onChange={handleClassEditChanges}>
                                        <option vlaue={null}>Select</option>
                                        {tests.map(test => {
                                            return (
                                                <option key={`${test.name}-${test.id}`} value={test.id}>{test.name}</option>
                                            )
                                        })}
                                    </select> 
                                </div>
                            </div>
                        ) : null }
                    </form>
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
                                    onClick={handleSubmitEditClass}
                                    className="p-1 w-1/4 bg-th-title-text text-th-light-text rounded">
                                        Update Class
                                </button>
                            </div>
                        ) : null }
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default EditClass;
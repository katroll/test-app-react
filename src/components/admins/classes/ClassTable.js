

function ClassTable({ spctc_class, handleRemoveClass, fetchClasses }) {

    function handleRemoveFromClass(route, classId, element, elementId) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/${route}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({spctc_class_id: classId, [element]: elementId})
        })
        .then(resp => {
            fetchClasses();
            console.log("complete")
        })
    }

 
    return (
        <div className="flex flex-col items-center w-full px-10">
            <div className="flex w-full items-center py-2 pr-5 bg-th-table-header-bg rounded-t group">
                <div className="w-full text-center text-th-light-text text-lg font-semibold tracking-wider">{spctc_class.name}</div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="20" height="20"
                    viewBox="0 0 50 50"
                    style={{fill: "#000000"}}
                    className="cursor-pointer invisible group-hover:visible"
                    onClick={() => handleRemoveClass(spctc_class.id)}
                >
                    <g fill="white">
                        <path d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"></path>
                    </g>
                </svg>
            </div>
            <div className="flex w-full justify-between pr-3 bg-th-light-gray-bg border-b border-b-th-border">
                <a className="flex justify-start w-full items-center font-semibold pl-3 py-2 overflow-hidden text-th-title-text transition duration-300 ease-in-out cursor-pointer" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone" data-bs-toggle="collapse" data-bs-target={`#collapse-class-students-${spctc_class.id}`} aria-expanded="false" aria-controls="collapse-class-tests">
                    <span>Students</span>
                    <svg 
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        className="w-3 h-3 ml-2" 
                        role="img" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                </a>
            </div>
                {spctc_class.users.map((user, index) => {
                    return (
                        <ul key={`${user.first_name}-${user.id}`} className="relative w-full accordion-collapse collapse" id={`collapse-class-students-${spctc_class.id}`} aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li className="relative">
                                <div className={`flex justify-between text-sm py-2 px-5 bg-th-card-bg transition duration-300 ease-in-out group ${index < spctc_class.users.length - 1 ? "border-b border-th-border" : null}`}>
                                    <p>{`${user.first_name} ${user.last_name}`}</p>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="20" height="20"
                                        viewBox="0 0 50 50"
                                        style={{fill: "#000000"}}
                                        className="cursor-pointer invisible group-hover:visible"
                                        onClick={() => handleRemoveFromClass("remove_student_from_class", spctc_class.id, "user_id", user.id)}
                                    >
                                        <path d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"></path>
                                    </svg>
                                </div>
                            </li>   
                        </ul>
                    )
                })}
            <div className="flex w-full justify-between pr-3 bg-th-light-gray-bg border-b border-b-th-border">
                <a className="flex justify-start w-full items-center font-semibold pl-3 py-2 overflow-hidden text-th-title-text transition duration-300 ease-in-out cursor-pointer" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone" data-bs-toggle="collapse" data-bs-target={`#collapse-class-tests-${spctc_class.id}`} aria-expanded="false" aria-controls="collapse-class-tests">
                    <span>Tests</span>
                    <svg 
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        className="w-3 h-3 ml-2" 
                        role="img" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                </a>
            </div>
                {spctc_class.quizzes.map((test, index) => {
                    return (
                        <ul key={`${test.first_name}-${test.id}`} className="relative w-full accordion-collapse collapse" id={`collapse-class-tests-${spctc_class.id}`} aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li className="relative">
                                <div className={`flex justify-between text-sm  py-2 px-5 bg-th-card-bg transition duration-300 ease-in-out group ${index < spctc_class.quizzes.length - 1 ? "border-b border-th-border" : null}`}>
                                    <p>{test.name}</p>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="20" height="20"
                                        viewBox="0 0 50 50"
                                        style={{fill: "#000000"}}
                                        className="cursor-pointer invisible group-hover:visible"
                                        onClick={() =>  handleRemoveFromClass("remove_quiz_from_class", spctc_class.id, "quiz_id", test.id)}
                                    >
                                        <path d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"></path>
                                    </svg>
                                </div>
                            </li>   
                        </ul>
                    )
                })}
        </div>
    )
}

export default ClassTable;
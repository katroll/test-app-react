

function ClassTable({ spctc_class }) {

    console.log(spctc_class)

    return (
        <div className="flex flex-col items-center w-full px-10">
            <div className="w-full py-2 text-center text-th-light-text text-lg font-semibold bg-th-table-header-bg rounded-t tracking-wider">{spctc_class.name}</div>
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
                {spctc_class.users.map(user => {
                    return (
                        <ul key={user.first_name} className="relative w-full accordion-collapse collapse" id={`collapse-class-students-${spctc_class.id}`} aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li className="relative">
                                <div className="flex justify-start text-sm py-2 pl-5 bg-th-card-bg transition duration-300 ease-in-out">
                                    <span>{user.first_name}</span>
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
                {spctc_class.quizzes.map(test => {
                    return (
                        <ul key={test.name} className="relative w-full accordion-collapse collapse" id={`collapse-class-tests-${spctc_class.id}`} aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li className="relative">
                                <div className="flex justify-start text-sm  py-2 pl-5 bg-th-card-bg transition duration-300 ease-in-out">
                                    <span>{test.name}</span>
                                </div>
                            </li>   
                        </ul>
                    )
                })}
        </div>
    )
}

export default ClassTable;
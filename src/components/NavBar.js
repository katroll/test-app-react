import "../index.css"
import { useNavigate  } from "react-router-dom";
import 'tw-elements';
import logo from "../circleLogo.png"

import { useContext } from "react"
import { UserContext } from "../context/User"

function NavBar({ onSignOut }) {
    const navigate = useNavigate();
    const user = useContext(UserContext).user;

    
    const categories = ["beginner", "intermediate", "advanced", "english", "misc"]

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="w-60 pb-20 h-full shadow-md bg-th-secondary fixed z-10 overflow-y-scroll" id="sidenavSecExample">
            <div className="pt-4 pb-2 px-6">
                <div className="flex flex-col items-center">
                    <div className="shrink-0">
                        <img src={logo}
                            className="rounded-full w-24" 
                            alt="Avatar"/>
                    </div>
                    <div className="grow mt-3">
                        <p className="text-xl font-semibold text-th-light-text">{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                    <button onClick={onSignOut} className="">
                        <a className="flex items-center bg-th-navbar-hover text-md font-semibold mt-2 px-10 h-12 overflow-hidden text-th-title-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Logout</span>
                        </a>
                    </button>
                </div>
            </div>

            <ul className="relative px-1 mt-5">
                <li className="relative" onClick={() =>  navigate(`${process.env.PUBLIC_URL}/`)}>
                    <a className="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                        <span>Home</span>
                    </a>
                </li>   
            </ul>

            {user.admin ? (
                <>
                <ul className="relative px-1">
                    <li className="relative" onClick={() =>  navigate(`${process.env.PUBLIC_URL}/uploadquiz`)}>
                        <a className="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Upload a Test</span>
                        </a>
                    </li>   
                </ul>
                <ul className="relative px-1">
                    <li className="relative" onClick={() => navigate(`${process.env.PUBLIC_URL}/students`)}>
                        <a className="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Users</span>
                        </a>
                    </li>   
                </ul>
                <ul className="relative px-1">
                    <li className="relative" onClick={() => navigate(`${process.env.PUBLIC_URL}/testdata`)}>
                        <a className="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Testing Data</span>
                        </a>
                    </li>   
                </ul>
                </>
            ): ( null )}



            
                <a className="flex items-center text-md font-semibold py-4 px-7 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out cursor-pointer" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-expanded="false" aria-controls="collapseSidenavSecEx2">
                    <span>Tests</span>
                    <svg 
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        className="w-3 h-3 ml-auto" 
                        role="img" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                </a>
                {categories.map(category => {
                    return (
                        <ul key={category} className="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li className="relative" onClick={() => navigate(`${process.env.PUBLIC_URL}/tests/${category}`)}>
                                <a className="flex items-center text-sm font-semibold mx-5 py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                                    <span>{capitalizeFirstLetter(category)}</span>
                                </a>
                            </li>   
                        </ul>
                    )
                })}
                
            

            {!user.admin? (
                
                <ul className="relative px-1">
                    <li onClick={() => navigate(`${process.env.PUBLIC_URL}/mygrades`)} className="relative">
                    <a className="flex items-center text-base font-semibold py-4 px-6 h-12 overflow-hidden text-th-light-text text-ellipsis whitespace-nowrap rounded hover:text-th-title-text hover:bg-th-navbar-hover transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                        <span>Grades</span>
                    </a>
                    </li>
                </ul>
            ) : ( null )}

        </div>
    )
}

export default NavBar;
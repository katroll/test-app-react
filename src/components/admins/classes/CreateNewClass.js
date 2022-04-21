import { useState } from "react";

function CreateNewClass({ addNewClass }) {
    const [createClass, setCreateClass] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    console.log(newClassName)

    function handleCreateNewClass(e) {
        e.preventDefault();

        fetch("https://morning-scrubland-82075.herokuapp.com/spctc_classes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: newClassName})
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(newClass => {
                    addNewClass(newClass);
                    setCreateClass(false);
                });
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }

    function addClassToggle() {
        setCreateClass(!createClass);
    }

    return (
        <div className="flex flex-col items-start">
            <button
                className="flex items-center pl-10 mb-3 text-2xl font-bold text-th-title-text"
                onClick={addClassToggle}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px"
                        className="w-5 h-5 mr-3"
                        viewBox="0 0 172 172"
                        style={{fill:"#000000"}}>
                            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{"mixBlendMode": "normal"}}>
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#1f57be">
                                    <path d="M86,6.88c-43.65603,0 -79.12,35.46397 -79.12,79.12c0,43.65603 35.46397,79.12 79.12,79.12c43.65603,0 79.12,-35.46397 79.12,-79.12c0,-43.65603 -35.46397,-79.12 -79.12,-79.12zM86,13.76c39.93779,0 72.24,32.30221 72.24,72.24c0,39.93779 -32.30221,72.24 -72.24,72.24c-39.93779,0 -72.24,-32.30221 -72.24,-72.24c0,-39.93779 32.30221,-72.24 72.24,-72.24zM82.56,44.72v37.84h-37.84v6.88h37.84v37.84h6.88v-37.84h37.84v-6.88h-37.84v-37.84z"></path>
                                </g>
                            </g>
                    </svg>
                    <p>New Class</p>
            </button>
            {createClass ? (
                <div className="flex justify-center mb-3 pl-10 py-3 w-full bg-th-card-bg">
                    <form 
                        className="flex space-x-2 items-center"
                        onSubmit={handleCreateNewClass}
                    >
                        <label>Name of Class: </label>
                        <input 
                            type="text" 
                            className="p-1 text-sm outline-none border border-th-border rounded"
                            onChange={(e) => setNewClassName(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="p-1 bg-th-title-text text-th-light-text rounded">Add Class</button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default CreateNewClass;
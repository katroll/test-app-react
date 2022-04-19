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
                className="pl-10 mb-3 text-3xl font-bold text-th-title-text"
                onClick={addClassToggle}>
                    + Class
            </button>
            {createClass ? (
                <div className="flex justify-center pl-10 py-3 w-full bg-th-card-bg">
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
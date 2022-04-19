import { useState } from "react";

function CreateNewClass() {
    const [createClass, setCreateClass] = useState(false);

    return (
        <div className="flex flex-col items-start">
            <button
                className="pl-10 text-3xl font-bold text-th-title-text"
                onClick={() => setCreateClass(true)}>
                    + Class
            </button>
            {createClass ? (
                <div className="flex justify-center pl-10 py-3 my-3 w-full bg-th-card-bg">
                    <form 
                        className="flex space-x-2 items-center"
                        onSubmit={null}
                    >
                        <label>Name of Class: </label>
                        <input type="text" className="outline-none border border-th-border rounded"/>
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
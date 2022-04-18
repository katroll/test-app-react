import { useState } from "react";

function ExitTestButton({ setTakingQuiz }) {
    const [exitTestWarning, setExitTestWarning] = useState(false);

    return (
        <>
            <button 
                type="button" 
                className="w-1/3 mt-1 mb-5 py-2 text-th-light-text bg-th-button rounded hover:bg-th-green-button-hover text-md px-1 text-center"
                onClick={() => setExitTestWarning(true)}>
                    Exit Test 
            </button>
            { exitTestWarning ? (
                <div className="flex flex-col p-3 bg-th-light-blue-bg border border-th-border rounded">
                    <p>Are you sure you would like to exit this test? Your answers will not be saved.</p>
                    <div className="flex flex-row px-20 justify-around">
                        <button 
                            className="p-1 px-3 bg-th-warning text-th-light-text rounded"
                            onClick={() => setTakingQuiz(false)}>
                                Yes, Exit Test
                        </button>
                        <button 
                            className="p-1 px-3 bg-th-secondary text-th-light-text rounded"
                            onClick={() => setExitTestWarning(false)}>
                                No, Continue Test
                        </button>
                    </div>
                </div>
            ) : null }
        </>
    )
}

export default ExitTestButton;
import {useContext, useState} from "react";
import { QuizzesContext } from "../context/Quizzes";


function TestDeletePopup({ quizToDelete, setDeleteTestWarning }) {
    const quizzesContext = useContext(QuizzesContext);
    const [deleteResult, setDeleteResult] = useState("");



    function handleDeleteQuiz() {
        quizzesContext.deleteQuiz(quizToDelete, setDeleteQuizResult);

    }

    function setDeleteQuizResult(result) {
        if(result) {
            setDeleteResult("Quiz Deleted!");
        } else {
            setDeleteResult("Failed to delete quiz.");
        }
        setTimeout(() => {
            setDeleteResult("");
            if(result) {
                setDeleteTestWarning(false);
            }
        }, 2000);
    }

    return (
        <div className="flex flex-col items-center w-full h-full mt-10">
            <div className="flex flex-col items-center bg-th-card-bg rounded p-3 border-2 border-th-table-header-bg">
                    <p>Are you sure you would like to delete <span className="font-bold">{quizToDelete.name}</span>? All data and associated grades will be deleted.</p>
                    <div className="flex space-x-5 mt-2">
                        <button  
                            onClick={handleDeleteQuiz}
                            className="p-1 bg-th-button text-th-light-text hover:bg-th-green-button-hover rounded" 
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={() => setDeleteTestWarning(false)}
                            className="p-1 bg-th-button text-th-light-text hover:bg-th-green-button-hover rounded" 
                        >
                            Cancel
                        </button>
                    </div>
                    {deleteResult ? (
                        <div className="w-full flex justify-center my-2">
                            <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                {deleteResult}
                            </div>
                        </div>
                    ) : null}
                </div>
        </div>
    )
}

export default TestDeletePopup;
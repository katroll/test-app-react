import React, { useEffect } from "react";

import { createContext, useState } from "react";

import * as Base64 from "base64-arraybuffer"

const QuizzesContext = createContext();

function QuizzesProvider({ children }) {
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch("https://morning-scrubland-82075.herokuapp.com/quizzes", {
            headers: { 
                key: "04af711a-ca6c-11ec-9d64-0242ac120002" 
            },
            signal: signal
        })
        .then(resp => resp.json())
        .then(quizzes => {
            quizzes.map(quiz => {
                quiz.questions.map(question => {
                if(question.imageBase64) {
                    question.imageUrl = createImgUrl(question);
                }
                return question;
            })
            return quiz.questions.sort((a, b) => a.number - b.number);  
            })
            setQuizzes(quizzes);
            });

        return () => {
            controller.abort();
        };
    }, [])

    function createImgUrl(question) {
        const imageArrayBuffer = Base64.decode(question.imageBase64);
        const blob = new Blob( [ imageArrayBuffer ], { type: "image/jpeg" } );
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL( blob );
        return imageUrl;
    }

    function deleteQuiz(quizToDelete, setDeleteQuizResult) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/quizzes/${quizToDelete.id}`, {
            method: "DELETE",
            headers: { 
                key: "04af711a-ca6c-11ec-9d64-0242ac120002" 
            }
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then(() => {
                const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizToDelete.id)
                setQuizzes(updatedQuizzes);
                setDeleteQuizResult(true);

              });
            } else {
              resp.json().then(errors => console.log(errors))
              setDeleteQuizResult(false);
            }
        });
    }

    function quizzesContext(quizzes, setValue) {
        return {
            quizzes: quizzes,
            setValue: setValue,
            deleteQuiz: deleteQuiz,
        }
    }
    
    const context = quizzesContext(quizzes, setQuizzes);


    return (
        <QuizzesContext.Provider value={context}>
            {quizzes === null ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
            ) : (
                children
            )}
        </QuizzesContext.Provider>
    )
    
}

export { QuizzesContext, QuizzesProvider };
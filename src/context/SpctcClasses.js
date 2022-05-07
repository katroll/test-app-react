import React, { useEffect } from "react";
import { createContext, useState } from "react";

const SpctcClassesContext = createContext();

function SpctcClassesProvider({ children }) {
    const [spctcClasses, setSpctcClasses] = useState([])

    useEffect(() => {
        getClasses();
    }, [])

    function getClasses() {
        fetch("https://morning-scrubland-82075.herokuapp.com/spctc_classes", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(classes => setSpctcClasses(classes));
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }

    function deleteSpctcClass(id) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/spctc_classes/${id}`, {
            method: "DELETE",
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then((resp) => {
            if (resp.ok) {
                const updatedClasses = spctcClasses.filter(spctc_class => spctc_class.id !== id);
                setSpctcClasses(updatedClasses);
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }

    function createSpctcClass(newClassName) {
        console.log(newClassName);

        fetch("https://morning-scrubland-82075.herokuapp.com/spctc_classes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
        },
            body: JSON.stringify({name: newClassName})
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(newClass => {
                    setSpctcClasses([...spctcClasses, newClass]);
                });
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }

    function editSpctcClass(table, elementId, updateArray, classToEdit) {
        const allFetches = updateArray.map(element => {
            return fetch(`https://morning-scrubland-82075.herokuapp.com/${table}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    key: "04af711a-ca6c-11ec-9d64-0242ac120002"
                },
                body: JSON.stringify({spctc_class_id: classToEdit.class.id, [elementId]: element.id})
            })
            .then(resp => resp.json())
        }) 

        Promise.all(allFetches).then(resp => {
            getClasses();
          })
    }

    function removeFromClass(route, classId, element, elementId) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            },
            body: JSON.stringify({spctc_class_id: classId, [element]: elementId})
        })
        .then(resp => {
            getClasses();
        })
    }


    function spctcClassesContext(spctcClasses, setValue) {
        return {
            spctcClasses: spctcClasses,
            setValue: setValue,
            deleteSpctcClass: deleteSpctcClass,
            createSpctcClass: createSpctcClass,
            editSpctcClass: editSpctcClass,
            removeFromClass, removeFromClass
        }
    }
    
    const context = spctcClassesContext(spctcClasses, setSpctcClasses);


    return (
        <SpctcClassesContext.Provider value={context}>
            {spctcClasses === null ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
            ) : (
                children
            )}
        </SpctcClassesContext.Provider>
    )
    
}

export { SpctcClassesContext, SpctcClassesProvider };
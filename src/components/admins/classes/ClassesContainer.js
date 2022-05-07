import { useEffect, useState } from "react";
import ClassTable from "./ClassTable";
import CreateNewClass from "./CreateNewClass";
import EditClass from "./EditClass";

import { gsap } from "gsap";

function ClassesContainer() {
    const [classes, setClasses] = useState([]);
    const sortedClasses = classes.sort((a,b) => (a.name < b.name) ? 1 : -1);

    console.log(classes)

    useEffect(() => {
        fetchClasses();
    }, [])

    function fetchClasses() {
        fetch("https://morning-scrubland-82075.herokuapp.com/spctc_classes", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(classes => setClasses(classes));
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }

    function addNewClass(newClass) {
        setClasses([...classes, newClass]);
    }

    function handleRemoveClass(id) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/spctc_classes/${id}`, {
            method: "DELETE",
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
        .then((resp) => {
            if (resp.ok) {
                const updatedClasses = classes.filter(spctc_class => spctc_class.id !== id);
                setClasses(updatedClasses);
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }


    const onMouseEnterButton = ({ currentTarget }) => {
        gsap.to(currentTarget, { x: 20, duration: 1 });
    };

    const onMouseLeaveButton = ({ currentTarget }) => {
        gsap.to(currentTarget, { x: 0, duration: 1 });
    };


    return (
        <div className="flex flex-col pt-5 divide-y divide-th-border">
            <div>
                <CreateNewClass addNewClass={addNewClass} onMouseEnterButton={onMouseEnterButton} onMouseLeaveButton={onMouseLeaveButton}/>
                <EditClass classes={sortedClasses} fetchClasses={fetchClasses} onMouseEnterButton={onMouseEnterButton} onMouseLeaveButton={onMouseLeaveButton}/>
            </div>
            <div className="flex flex-col items-center space-y-3">
                <p className="mt-3 text-3xl font-bold text-th-title-text">Current Classes</p>
                {sortedClasses.map(spctc_class => <ClassTable key={`${spctc_class.name}-${spctc_class.id}`} spctc_class={spctc_class} handleRemoveClass={handleRemoveClass} fetchClasses={fetchClasses}/> )}
            </div>
        </div>
    )
}

export default ClassesContainer;
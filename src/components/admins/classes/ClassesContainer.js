import { useEffect, useState } from "react";
import ClassTable from "./ClassTable";
import CreateNewClass from "./CreateNewClass";
import EditClass from "./EditClass";


function ClassesContainer() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("https://morning-scrubland-82075.herokuapp.com/spctc_classes")
        .then((resp) => {
            if (resp.ok) {
                resp.json().then(classes => setClasses(classes));
            } else {
                resp.json().then(errors => console.log(errors))
            }
        });
    }, [])

    function addNewClass(newClass) {
        setClasses([...classes, newClass]);
    }


    return (
        <div className="flex flex-col pt-5 divide-y divide-th-border">
            <div>
                <CreateNewClass addNewClass={addNewClass}/>
                <EditClass classes={classes}/>
            </div>
            <div className="flex flex-col items-center space-y-3">
                <p className="mt-3 text-3xl font-bold text-th-title-text">Current Classes</p>
                {classes.map(spctc_class => <ClassTable key={`${spctc_class.name}-${spctc_class.id}`} spctc_class={spctc_class}/> )}
            </div>
        </div>
    )
}

export default ClassesContainer;
import { useEffect, useState, useContext } from "react";
import ClassTable from "./ClassTable";
import CreateNewClass from "./CreateNewClass";
import EditClass from "./EditClass";

import { SpctcClassesContext } from "../../../context/SpctcClasses";

import { gsap } from "gsap";

function ClassesContainer() {
    const spctcClasses = useContext(SpctcClassesContext);
    const sortedClasses = spctcClasses.spctcClasses.sort((a,b) => (a.name < b.name) ? 1 : -1);

    function handleRemoveClass(id) {
        spctcClasses.deleteSpctcClass(id)
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
                <CreateNewClass createSpctcClass={spctcClasses.createSpctcClass} onMouseEnterButton={onMouseEnterButton} onMouseLeaveButton={onMouseLeaveButton}/>
                <EditClass classes={sortedClasses} editSpctcClass={spctcClasses.editSpctcClass} onMouseEnterButton={onMouseEnterButton} onMouseLeaveButton={onMouseLeaveButton}/>
            </div>
            <div className="flex flex-col items-center space-y-3">
                <p className="mt-3 text-3xl font-bold text-th-title-text">Current Classes</p>
                {sortedClasses.map(spctc_class => <ClassTable key={`${spctc_class.name}-${spctc_class.id}`} spctc_class={spctc_class} handleRemoveClass={handleRemoveClass} removeFromClass={spctcClasses.removeFromClass} /> )}
            </div>
        </div>
    )
}

export default ClassesContainer;
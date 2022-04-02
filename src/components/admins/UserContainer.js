import { useState } from "react";
import StudentTable from "./StudentTable";
import UserCard from "./UserCard";
import AdminTable from "./AdminTable";


function UserContainer() {
    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [showStudents, setShowStudents] = useState(true);


    return (
        <div>
            {popUp ? (
                <div className="absolute flex w-full h-full pl-10 bg-th-transparent-bg">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className="pt-5 flex justify-center w-full">
                <div className="flex flex-col items-center w-full">
                    <p className="font-bold text-4xl text-th-title-text mb-5 tracking-wider">{showStudents ? "STUDENTS" : "ADMINS"}</p>
                    <div className="flex justify-start w-full pl-5 mb-5 ml-5">
                        <input 
                            type="radio" 
                            name="userType" 
                            className="mr-2 mt-2" 
                            checked={showStudents}
                            onChange={() => setShowStudents(!showStudents)}/>
                        <label className="mr-4 text-th-title-text text-lg">Students</label>
                        <input 
                            type="radio" 
                            name="userType" 
                            className="mr-2 mt-2" 
                            checked={!showStudents}
                            onChange={() => setShowStudents(!showStudents)}/>
                        <label className="text-th-title-text text-lg">Admins</label>
                    </div>
                   
                    {showStudents ? (
                        <div>
                            <StudentTable setPopUp={setPopUp} setSelectedUser={setSelectedUser} />
                        </div>

                    ) : (
                        <div className="w-full pl-8 py-2 flex w-full">
                            <AdminTable />
                        </div>
                    )}
                   
                </div>
            </div>
        </div>
    )
        
}

export default UserContainer;
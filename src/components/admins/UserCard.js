import { useState, useContext } from "react";
import StudentGrades from "../StudentGrades";
import { UsersContext } from "../../context/Users"



function UserCard({ user, setPopUp }) {
    const [updatePassword, setUpdatePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [passwordUpdateResult, setPasswordUpdateResult] = useState("");
    const [adminUpdateResult, setAdminUpdateResult] = useState("");
    const [deleteResult, setDeleteResult] = useState("");
    const [userNoMatch, setUserNoMatch] = useState(false)

    const usersContext = useContext(UsersContext);
   
    function handleUpdateUserPassword(e) {
        e.preventDefault();
        usersContext.updatePassword(user, newPassword, setUpdatePasswordResult);
        setUpdatePassword(false);
    }

    function handleDeleteUser() {
        if (userToDelete.replace(/\s+/g, '') === user.username.replace(/\s+/g, '')) {
            usersContext.deleteUser(user, setDeleteUserResult);
            setUserNoMatch(false);
        } else {
            setUserNoMatch(true);
        }
    }

    function handleAdminToggle() {
        usersContext.updateAdmin(user, setUpdateAdminResult);
    }

    function setUpdatePasswordResult(result) {
        if(result) {
            setPasswordUpdateResult("Password Updated!");
        } else {
            setPasswordUpdateResult("Password Update Failed.");
        }
        setTimeout(() => setPasswordUpdateResult(""), 2000);
    }

    function setDeleteUserResult(result) {
        if(result) {
            setDeleteResult("User Deleted!");
        } else {
            setDeleteResult("Failed to delete user.");
        }
        setTimeout(() => {
            setDeleteResult("");
            if(result) {
                setPopUp(false);
            }
        }, 2000);
    }

    function setUpdateAdminResult(result) {
        if(result) {
            setAdminUpdateResult(`${user.first_name} ${user.last_name} promoted to admin.`);
        } else {
            setAdminUpdateResult(`Failed to promote ${user.first_name} ${user.last_name} to admin.`);
        }
        setTimeout(() => setAdminUpdateResult(""), 2000);
    }


    return (
        <div className="flex flex-col w-full h-full p-10 pr-72">
            <div className="flex flex-col w-full">
                <div className="flex items-center bg-th-table-header-bg p-1 h-[60px] rounded-t border-r border-th-border">
                    <div className="pl-2 pt-1">
                        <button 
                            className="text-sm p-1 text-th-light-text bg-th-button rounded shadow hover:bg-th-green-button-hover" 
                            onClick={() => setPopUp(false)}>
                                Close
                        </button>
                    </div>
                    <div className="flex w-full justify-center uppercase font-bold text-2xl py-4 text-th-light-text">
                        {user.first_name} {user.last_name}
                    </div>
                </div>
                
            
                <div className="bg-th-card-bg h-full">
                    <div className="px-6 py-4 border-b border-th-border">
                        <div className="text-sm leading-5 text-gray"> <strong>Username: </strong>{user.username}</div>
                    </div>  
                    <div className="px-6 py-4 border-b border-th-border">
                        <div className="text-sm leading-5 text-gray"> <strong>User ID: </strong>{user.id}</div>
                    </div> 
                    <div className="px-6 py-4 border-b border-th-border">
                        <div className="text-sm leading-5 text-gray"> <strong>Joined: </strong>{user.created_at.slice(0,10)}</div>
                    </div> 
                    <div className="flex flex-col">
                        <div className="px-3 py-2 border-th-border flex justify-center">
                            <button 
                                className="text-sm text-th-light-text bg-th-button hover:bg-th-green-button-hover rounded-l p-1 border-r border-th-border"
                                onClick={() => setUpdatePassword(true)}>
                                    Reset Password
                            </button>
                            <button 
                                className="text-sm text-th-light-text bg-th-button hover:bg-th-green-button-hover rounded-r p-1 " 
                                onClick={handleAdminToggle}>
                                    Make Admin
                            </button>
                        </div>
                            {adminUpdateResult ? (
                                <div className="w-full flex justify-center mb-1">
                                    <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                        {adminUpdateResult}
                                    </div>
                                </div>
                            ) : null }
                            {passwordUpdateResult ? (
                                <div className="w-full flex justify-center mb-1">
                                <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                    {passwordUpdateResult}
                                </div>
                            </div>
                            ) : null }
                    </div>
                        {updatePassword ? (
                            <div className="flex justify-center px-6 pb-3">
                                <form className="flex" onSubmit={handleUpdateUserPassword}>
                                    <input 
                                        type="password" 
                                        placeholder="Enter New Password"
                                        className="p-1 border border-th-secondary rounded text-sm mr-2 focus:outline-none"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-th-button hover:bg-th-green-button-hover text-th-light-text p-1 rounded text-sm">
                                        Update
                                    </button>
                                </form>
                            </div>
                        ) : null} 
                </div>
                    <div className="bg-th-card-bg pb-2 flex justify-center">
                        <button 
                            className="mx-5 bg-th-warning px-10 py-1 rounded text-th-light-text"
                            onClick={() => setDeleteWarning(true)}>
                            DELETE USER
                        </button>
                    </div>
                    {deleteWarning ? (
                    <div className="flex flex-col items-center bg-th-card-bg p-3 w-full">
                        <p>Are you sure you would like to delete this user? All associated data will be deleted.</p>
                        <div className="flex items-center">
                            <label>To confirm, enter username: </label>
                            <input 
                                type="text" 
                                placeholder="Username to delete"
                                className="rounded ml-2 pl-2 text-sm border border-th-secondary focus:outline-none"
                                onChange={(e) => setUserToDelete(e.target.value)}/>
                            <button
                                onClick={handleDeleteUser} 
                                className="ml-2 rounded bg-th-warning text-th-light-text p-1 text-sm">
                                Confirm 
                            </button>
                            <button
                                onClick={() => setDeleteWarning(false)} 
                                className="ml-2 rounded bg-th-warning text-th-light-text p-1 text-sm">
                                Cancel 
                            </button>
                        </div>
                        {deleteResult ? (
                                <div className="w-full flex justify-center my-2">
                                    <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                        {deleteResult}
                                    </div>
                                </div>
                        ) : null }

                        {userNoMatch ? (
                                <div className="w-full flex justify-center my-2">
                                    <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                        Type the username as exact match.
                                    </div>
                                </div>
                        ) : null }                      
                    </div>
                ) : null}
                </div>
                <div className="flex flex-col items-center mt-1">
                    <div className="w-full text-2xl py-4 font-bold bg-th-table-header-bg flex justify-center items-center text-th-light-text">
                        TESTS
                    </div>
                    <div className="bg-th-card-bg w-full rounded-b flex justify-center overflow-y-scroll">
                        <div className="overflow-hidden">
                            <StudentGrades user={user} height="max-h-[30vh]" />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UserCard;


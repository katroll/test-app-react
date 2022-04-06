import React, { useEffect, createContext, useState } from "react";

import { useContext } from "react";
import { UserContext } from "./User";

const UsersContext = createContext();

function UsersProvider({ children }) {
    const currUser = useContext(UserContext).user;
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("https://morning-scrubland-82075.herokuapp.com/users")
        .then(resp => resp.json())
        .then(users => setUsers(users))
    }, [])

    function updateAdmin(userToUpdate, setUpdateAdminResult) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/users/${userToUpdate.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json", 
              user_id: localStorage.getItem("userId")
            },
            body: JSON.stringify({admin: !userToUpdate.admin})
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then((updatedUser) => {
                const updatedUsers = users.map(user => {
                    if(user.id === updatedUser.id) {
                        return updatedUser;
                    }
                    return user;
                })
                setUsers(updatedUsers);
                setUpdateAdminResult(true);
              });
            } else {
              resp.json().then(errors => console.log(errors))
              setUpdateAdminResult(false);
            }
          });
      
    }

    function updatePassword(user, newPassword, setUpdatePasswordResult) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              user_id: localStorage.getItem("userId")
            },
            body: JSON.stringify({password: newPassword})
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then((updatedUser) => {
                const updatedUsers = users.map(user => {
                    if(user.id === updatedUser.id) {
                        return updatedUser;
                    }
                    return user;
                })
                setUsers(updatedUsers);
                setUpdatePasswordResult(true);
              });
            } else {
              resp.json().then(errors => console.log(errors))
              setUpdatePasswordResult(false);
            }
          });
    }

    function deleteUser(userToUpdate, setDeleteUserResult) {
        fetch(`https://morning-scrubland-82075.herokuapp.com/users/${userToUpdate.id}`, {
            method: "DELETE",
            headers: {
              user_id: localStorage.getItem("userId")
            },
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then(() => {
                const updatedUsers = users.filter(user => user.id !== userToUpdate.id)
                setUsers(updatedUsers);
                setDeleteUserResult(true);

              });
            } else {
              resp.json().then(errors => console.log(errors))
              setDeleteUserResult(false);
            }
        });
    } 

    function usersContext(users, setValue) {
        return {
            users: users,
            setValue: setValue,
            updateAdmin: updateAdmin,
            deleteUser: deleteUser,
            updatePassword: updatePassword
        }
    }
    
    const context = usersContext(users, setUsers);



    return (
        <UsersContext.Provider value={context}>
            {users.length === 0 ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
            ) : (
                children
            )}
        </UsersContext.Provider>
    )
    
}

export { UsersContext, UsersProvider };
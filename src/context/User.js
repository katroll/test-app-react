import React, { useEffect } from "react";

import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children, setLoggedIn }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        findUser();
    }, [])

    function findUser() {
        fetch("https://morning-scrubland-82075.herokuapp.com/me", {
            headers: {
                user_id: localStorage.getItem("userId"),
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
              },
        }).then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => {
                setUser(user);
                setLoggedIn(true);
              });
            } else {
              resp.json().then(errors => console.log(errors))
            }
          });
    }

    function userContext(user, setValue) {
        return {
            user: user,
            setValue: setValue,
            findUser: findUser
        }
    }
    
    const context = userContext(user, setUser);

    return (
        <UserContext.Provider value={context}>
            {!user ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    )
    
}

export { UserContext, UserProvider };
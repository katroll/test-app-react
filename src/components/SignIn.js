import { useState } from 'react';

import { NavLink } from "react-router-dom";
import 'tw-elements';

import { useContext } from "react"
import { UserContext } from "../context/User"


export default function SignIn({ setLoggedIn }) {
    const [signInData, setSignIndata] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const findUser = useContext(UserContext).findUser;

    function handleSignInChange(e) {
        setSignIndata({
            ...signInData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://morning-scrubland-82075.herokuapp.com/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInData)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(user => {
                  localStorage.setItem("userId", user.session);
                  findUser();
                  setLoggedIn(true);
                })
            }
            else {
                resp.json().then(error => setError(error.error))
            }
        })
    }

  return (
      <div className="w-3/4 lg:w-6/12 bg-th-secondary rounded-md shadow-xl shadow-slate-600">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
          <div className="flex flex-col items-center rounded-t mb-0 px-6 py-6">
            <p className='text-4xl font-bold text-th-light-text'>Sign In</p>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-th-light-text text-sm font-bold mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Username"
                  onChange={handleSignInChange}/>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-th-light-text text-sm font-bold mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150" placeholder="Password"
                  onChange={handleSignInChange}/>
              </div>
              <div className="text-center mt-6">
                <button 
                  type="submit" 
                  className="bg-th-button text-th-light-text active:bg-text-blue text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-xl hover:bg-th-green-button-hover mr-1 mb-1 w-full ease-linear transition-all duration-150"> 
                    Sign In 
                </button>
              </div>
            </form>
            <div className="flex justify-between">
              <div className="flex items-start">
                    <p className="bg-th-warning text-th-light-text px-2 my-1 rounded">{error}</p>
              </div>
              <div className='flex flex-col items-end'>
                <NavLink to="/signup" className="text-th-light-text">Don't have a account? Sign up.</NavLink>
                <NavLink to="/signup" className="bengali text-th-light-text">বাংলা-মিডিয়াম</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
    
  }
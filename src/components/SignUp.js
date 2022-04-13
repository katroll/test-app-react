import "../index.css"

import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

import { useContext } from "react"
import { UserContext } from "../context/User"


export default function SignUp({ setLoggedIn }) {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        spctc_pin_code: 0,
        admin: 0,
        role: "student"
    })
    const [errors, setErrors] = useState([]);
    const setUser = useContext(UserContext).setValue;

 function handleSignUpFormChange(e) {
    setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value
    })
  };

  function handleSubmit(e) {
      e.preventDefault();

      if(!signUpData.spctc_pin_code) {
        setErrors([...errors, "Must enter valid SPCTC Pin Code"])
      }

      fetch("https://morning-scrubland-82075.herokuapp.com/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(signUpData)
      })
      .then(resp => {
        if (resp.ok) {
          resp.json().then((user) => {
            setUser(user);
            setLoggedIn(true);
          })
          .then(navigate(`${process.env.PUBLIC_URL}/`))
        } else {
          resp.json().then(errorData => setErrors([...errorData.error]))
        }
      })
  }

  console.log(errors);


  return (

      <div className="w-3/4 lg:w-6/12 bg-th-secondary rounded-md shadow-xl shadow-slate-600">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
          <div className="flex flex-col items-center rounded-t mb-0 px-6 py-6">
            <p className='text-4xl font-bold text-th-light-text'>Sign Up</p>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className='flex space-x-2'>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-th-light-text text-sm font-bold mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="first_name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="First Name"
                    onChange={handleSignUpFormChange}/>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-th-light-text text-sm font-bold mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="last_name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                    placeholder="Last Name"
                    onChange={handleSignUpFormChange}/>
                </div>
              </div>
      
              <div className="relative w-full mb-3">
                <label className="block uppercase text-th-light-text text-sm font-bold mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                  placeholder="Username"
                  onChange={handleSignUpFormChange}/>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-th-light-text text-sm font-bold mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                  placeholder="Password"
                  onChange={handleSignUpFormChange}/>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-th-light-text text-sm font-bold mb-2">SPCTC Pin Code</label>
                <input 
                  type="text" 
                  name="spctc_pin_code"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                  placeholder="SPCTC Pin Code"
                  onChange={handleSignUpFormChange}/>
              </div>
              <div className="text-center mt-6">
                <button 
                  type="submit" 
                  className="bg-th-button text-th-light-text active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"> 
                    Sign Up 
                </button>
              </div>
            </form>
            <div className="flex justify-between">
            {errors ? (
              <div className="flex flex-col items-start">
                {errors.map(error => {
                  return (
                    <p key={error} className="bg-th-warning text-th-light-text px-2 my-1 rounded">{error}</p>
                  )
                })}
              </div>
            ) : null }
            <div className='flex flex-col items-end'>
              <NavLink to="/" className="text-th-light-text">Already have an account? Sign in.</NavLink>
              <NavLink to="/" className="bengali text-th-light-text">বাংলা-মিডিয়াম</NavLink>
            </div>
            </div>
          </div>
        </div>
      </div>


  )
    
}
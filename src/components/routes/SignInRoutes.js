import { Routes, Route } from "react-router-dom"

import SignUp from "../SignUp";
import SignIn from "../SignIn";

import banner from "../../banner.jpg"


function SignInRoutes({ setLoggedIn }) {

    return (
        <div className="flex flex-col items-center justify-between bg-th-primary w-screen min-h-screen pt-5">
          <div className='flex flex-col items-center w-screen'>
            <img 
              src={banner}
              className="w-100 mb-5 border-4 border-th-light-blue-bg" 
              alt="Avatar"/>
            <Routes>
              <Route 
                  path={`/signup`}
                  element={<SignUp setLoggedIn={setLoggedIn} />}
                />
              
              <Route exact path={`/`}
                element={<SignIn setLoggedIn={setLoggedIn}/>}
              />
            </Routes>
          </div>
    </div>
      )
}

export default SignInRoutes;
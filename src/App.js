import './index.css';
import { useState } from "react"
import { useNavigate } from "react-router-dom";


import NavBar from './components/NavBar';
import StudentRoutes from './components/routes/StudentRoutes';
import AdminRoutes from './components/routes/AdminRoutes';
import SignInRoutes from './components/routes/SignInRoutes';

import { UserProvider, UserContext } from "./context/User"
import { QuizzesProvider } from "./context/Quizzes"



function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [takingQuiz, setTakingQuiz] = useState(false);


  function handleSignOut() {
    fetch("/signout", {
      method: "DELETE",
    }).then(() => {
      navigate(`/`)
      setLoggedIn(false)
    });
  }


  return (
    <div className="flex flex-row min-h-screen max-w-[100vw] bg-th-primary">
      <div className='flex flex-col w-full justify-between'>
          <UserProvider setLoggedIn={setLoggedIn}>
              <QuizzesProvider>
                <UserContext.Consumer>
                  {user => (
                    loggedIn === false ? (
                      <div className='spctc-login'>
                        <SignInRoutes setLoggedIn={setLoggedIn} />
                      </div>
                    ) : (
                      user.user.admin ? (
                        <div className='spctc-admin'>
                          <NavBar onSignOut={handleSignOut} />
                          <AdminRoutes />
                        </div>
                      ) : (
                        <div className='spctc-student'>
                          {!takingQuiz ? (
                            <NavBar onSignOut={handleSignOut} />
                          ) : null }
                          <StudentRoutes setTakingQuiz={setTakingQuiz} takingQuiz={takingQuiz} />
                        </div>
                      )
                    )
                  )}
                </UserContext.Consumer>

              </QuizzesProvider>
          </UserProvider>

        <div className='flex ml-60 pb-5 pt-2 mt-3 justify-center'>
          <p className='text-th-title-text'>© {new Date().getFullYear()} by St. Paul's Computer Training Center. <a href="http://www.info@spctc.org" target="_blank" rel="noreferrer">info@spctc.org</a></p>
        </div>
      </div>
      
    </div>
  )

}

export default App;
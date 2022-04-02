import { Routes, Route } from "react-router-dom"

import UplaodQuiz from '../admins/UploadQuiz';
import QuizViewer from '../QuizViewer';
import UserContainer from '../admins/UserContainer';
import AdminHome from '../admins/AdminHome';
import TestDataContainer from '../admins/testData/TastDataContainer';
import TestList from '../TestList';

import { UsersProvider } from "../../context/Users"

function AdminRoutes() {


    return (
        <div className="pl-60 w-full">
            <UsersProvider>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/uploadquiz`}
                    element={<UplaodQuiz />}
                    />
                    <Route path={`${process.env.PUBLIC_URL}/testdata`}
                    element={<TestDataContainer/>}
                    />
                    <Route exact path={`${process.env.PUBLIC_URL}/test/:name`} 
                    element={<QuizViewer />}
                    />
                    <Route path={`${process.env.PUBLIC_URL}/tests/:category`}
                    element={<TestList />}
                    />
                    <Route path={`${process.env.PUBLIC_URL}/students`}
                    element={<UserContainer />}
                    />
                    <Route path={`${process.env.PUBLIC_URL}/`}
                    element={<AdminHome />}
                    />
                </Routes>
            </UsersProvider>
        </div>
    )
}

export default AdminRoutes;
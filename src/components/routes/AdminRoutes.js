import { Routes, Route } from "react-router-dom"

import UplaodQuiz from '../admins/UploadQuiz';
import QuizViewer from '../QuizViewer';
import UserContainer from '../admins/UserContainer';
import AdminHome from '../admins/AdminHome';
import TestDataContainer from '../admins/testData/TastDataContainer';
import TestList from '../TestList';

import { UsersProvider } from "../../context/Users"
import { SpctcClassesProvider } from "../../context/SpctcClasses"
import ClassesContainer from "../admins/classes/ClassesContainer";

function AdminRoutes() {


    return (
        <div className="pl-60 w-full">
            <UsersProvider>
                <SpctcClassesProvider>
                    <Routes>
                        <Route path={`/uploadquiz`}
                        element={<UplaodQuiz />}
                        />
                        <Route path={`/testdata`}
                        element={<TestDataContainer/>}
                        />
                        <Route exact path={`/test/:name`} 
                        element={<QuizViewer />}
                        />
                        <Route path={`/tests/:category`}
                        element={<TestList />}
                        />
                        <Route path={`/students`}
                        element={<UserContainer />}
                        />
                        <Route exact path={`/classes`} 
                        element={<ClassesContainer />}
                        />
                        <Route path={`/`}
                        element={<AdminHome />}
                        />
                    </Routes>
                </SpctcClassesProvider>
            </UsersProvider>
        </div>
    )
}

export default AdminRoutes;
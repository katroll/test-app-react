import * as Excel from "exceljs";
import {saveAs} from "file-saver";

import { useContext, useState } from "react";
import { QuizzesContext } from "../../context/Quizzes";

function ExportAll() {
    const quizzes = useContext(QuizzesContext).quizzes;
    const [users, setUsers] = useState([]);
    const [grades, setGrades] = useState([]);
    const exportQuizzes = [];

    console.log(users)

    function getUsersClassList(user) {
        const classNames = user.spctc_classes.map(spctc_class => {
            return spctc_class.name;
        })
        return classNames;
    }

    const exportUsers = users.map(user => {
        return {...user, spctc_classes: getUsersClassList(user)}
    })

    console.log(exportUsers);

    quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
            exportQuizzes.push({quiz_id: quiz.id, quiz_name: quiz.name, category: quiz.category, ...question});
            return;
        })
        return;
    })

    const exportGrades = grades.map(grade => {
        const student = grade.user;
        const studentFullName = `${student.first_name} ${student.last_name}`
        return {
            ...grade, 
            testName: grade.quiz_data.quiz.name, 
            studentName: studentFullName, 
            numOfQuestions: grade.quiz_data.questions.length,
            userId: grade.user.id,
            testId: grade.quiz_data.quiz.id,
            testCategory: grade.quiz_data.quiz.category,
        }
    })

    const data = grades.map(grade => {
        const results = grade.results;
        return grade.quiz_data.questions.sort((a, b) => a.number - b.number).map((question, index) => {
            return {
                firstName: grade.user.first_name,
                lastName: grade.user.last_name,
                username: grade.user.username,
                studentId: grade.user.id,
                testName: grade.quiz_data.quiz.name,
                testCategory: grade.quiz_data.quiz.category,
                gradeId: grade.id,
                testScore: grade.score,
                questionNumber: index + 1,
                correct: results[index] === question.answer ? "Yes" : "No",
                completedAt: grade.updated_at,
                startedAt: grade.start_time,
            }
        })
    }).flat();


    function handleExportAll() {
        fetch("https://morning-scrubland-82075.herokuapp.com/exportusers", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
            .then(resp => resp.json())
            .then(users => setUsers(users))
            .catch(error => console.log(error))
        fetch("https://morning-scrubland-82075.herokuapp.com/grades", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            }
        })
            .then(resp => resp.json())
            .then(grades => {
                const gradesByDate = grades.reverse();
                setGrades(gradesByDate);
            })
            .catch(error => console.log(error))
    }

    async function handleExcelExport() {
        
        const workbook = new Excel.Workbook();
        const usersWorksheet = workbook.addWorksheet("Users");
        const gradesWorksheet = workbook.addWorksheet("Grades");
        const testsWorksheet = workbook.addWorksheet("Tests");
        const questionsWorksheet = workbook.addWorksheet("Question Data");

        usersWorksheet.columns = [
            {header: 'First Name', key: 'first_name', width: 15},
            {header: 'Last Name', key: 'last_name', width: 15}, 
            {header: 'Username', key: 'username', width: 15},
            {header: 'User ID', key: 'id', width: 15},
            {header: 'Current Classes', key: 'spctc_classes', width: 25},
            {header: 'Day/Time Account Created', key: 'created_at', width: 25},
        ];

        gradesWorksheet.columns = [
            {header: 'User ID', key: 'userId', width: 15},
            {header: 'Test ID', key: 'testId', width: 15},
            {header: 'User', key: 'studentName', width: 15}, 
            {header: 'Test', key: 'testName', width: 20},
            {header: 'Test Category', key: 'testCategory', width: 15},
            {header: 'Number of Questions', key: 'numOfQuestions', width: 20},
            {header: 'Score', key: 'score', width: 15},
            {header: 'Results', key: 'results', width: 15},
            {header: 'Day/Time Started', key: 'start_time', width: 25},
            {header: 'Day/Time Completed', key: 'updated_at', width: 25},
        ];

        testsWorksheet.columns = [
            {header: 'Test ID', key: 'quiz_id', width: 15},
            {header: 'Test Name', key: 'quiz_name', width: 15}, 
            {header: 'Test Category', key: 'category', width: 15},
            {header: 'Question ID', key: 'id', width: 15},
            {header: 'Question Number', key: 'number', width: 15},
            {header: 'Question', key: 'question', width: 25},
            {header: 'Bengali', key: 'bengali', width: 25},
            {header: 'Choices', key: 'choices', width: 25},
            {header: 'Answer', key: 'answer', width: 25},
        ];

        questionsWorksheet.columns = [
            {header: 'First Name', key: 'firstName', width: 15},
            {header: 'Last Name', key: 'lastName', width: 15}, 
            {header: 'Username', key: 'username', width: 15},
            {header: 'Student ID', key: 'studentId', width: 15},
            {header: 'Test Name', key: 'testName', width: 20},
            {header: 'Test Category', key: 'testCategory', width: 15},
            {header: 'Grade ID', key: 'gradeId', width: 15},
            {header: 'Question Number', key: 'questionNumber', width: 15},
            {header: 'Correct', key: 'correct', width: 15},
            {header: 'Started At', key: 'startedAt', width: 25},
            {header: 'Completed At', key: 'completedAt', width: 25},

        ];
      
        usersWorksheet.addRows(exportUsers);
        gradesWorksheet.addRows(exportGrades);
        testsWorksheet.addRows(exportQuizzes);
        questionsWorksheet.addRows(data);
    
        const buffer = await workbook.xlsx.writeBuffer();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = '.xlsx';

        const blob = new Blob([buffer], {type: fileType});

        saveAs(blob, `${new Date()}-database` + fileExtension);

    }

    if(users.length > 0 && grades.length > 0) {
        handleExcelExport();
    }


    return (
        <div>
            <button 
                className="p-2 rounded text-white bg-th-button hover:bg-th-green-button-hover text-th-light-text"
                onClick={handleExportAll}>
                    Export Database
            </button>
        </div>
    )
}

export default ExportAll;
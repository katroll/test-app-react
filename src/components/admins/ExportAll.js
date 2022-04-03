import * as Excel from "exceljs";
import {saveAs} from "file-saver";

import { useContext, useState } from "react";
import { QuizzesContext } from "../../context/Quizzes";

function ExportAll() {
    const quizzes = useContext(QuizzesContext).quizzes;
    const [users, setUsers] = useState([]);
    const [grades, setGrades] = useState([]);
    const exportQuizzes = [];

    quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
            exportQuizzes.push({quiz_id: quiz.id, quiz_name: quiz.name, category: quiz.category, ...question});
            return;
        })
        return;
    })


    function handleExportAll() {
        fetch("https://morning-scrubland-82075.herokuapp.com/exportusers")
            .then(resp => resp.json())
            .then(users => setUsers(users))
            .catch(error => console.log(error))
        fetch("https://morning-scrubland-82075.herokuapp.com/exportgrades")
            .then(resp => resp.json())
            .then(grades => setGrades(grades))
            .catch(error => console.log(error))
    }

    async function handleExcelExport() {
        
        const workbook = new Excel.Workbook();
        const usersWorksheet = workbook.addWorksheet("Users");
        const gradesWorksheet = workbook.addWorksheet("Grades");
        const testsWorksheet = workbook.addWorksheet("Tests");

        usersWorksheet.columns = [
            {header: 'First Name', key: 'first_name', width: 15},
            {header: 'Last Name', key: 'last_name', width: 15}, 
            {header: 'Username', key: 'username', width: 15},
            {header: 'User ID', key: 'id', width: 15},
            {header: 'Day/Time Account Created', key: 'created_at', width: 25},
        ];

        gradesWorksheet.columns = [
            {header: 'User ID', key: 'user_id', width: 15},
            {header: 'Test ID', key: 'quiz_id', width: 15}, 
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
      
        usersWorksheet.addRows(users);
        gradesWorksheet.addRows(grades);
        testsWorksheet.addRows(exportQuizzes);
    
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
                className="p-1 rounded bg-th-button text-th-light-text hover:bg-th-green-button-hover"
                onClick={handleExportAll}>
                    Export Database
            </button>
        </div>
    )
}

export default ExportAll;
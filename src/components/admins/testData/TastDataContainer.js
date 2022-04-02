import { useState, useEffect, useMemo } from "react";
import * as Excel from "exceljs";

import {saveAs} from "file-saver";

import SelectColumnFilter from "./SelectColumnFilter";
import DefaultColumnFilter from "./DefaultColumnFilter";
import CorrectAnswerFilter from "./CorrectAnswerFilter";

import FilteredDataTable from "./FilteredDataTable";





function TestDataContainer() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch("/grades", {
            signal: signal
        })
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate);
        });

        return () => {
            controller.abort();
        };
    }, [])
    
    //const columns = ["Student Name", "Username", "Student ID", "Test Name", "Test Score", "Question Number", "Correct", "Day/Time Completed"]

    const columns = useMemo(
        () => [
            
            {
            Header: 'First Name',
            accessor: 'firstName',
            Filter: DefaultColumnFilter,
            },
            {
            Header: 'Last Name',
            accessor: 'lastName',
            Filter: DefaultColumnFilter,
            },
            {
                Header: 'Username',
                accessor: 'username',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Student ID',
                accessor: 'studentId',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Test Name',
                accessor: 'testName',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Test Category',
                accessor: 'testCategory',
                Filter: SelectColumnFilter,
            },
            {
                Header: 'Grade ID',
                accessor: 'gradeId',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Test Score',
                accessor: 'testScore',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Question Number',
                accessor: 'questionNumber',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Answer',
                accessor: 'correct',
                Filter: CorrectAnswerFilter,
            },
            {
                Header: 'Day/Time Started',
                accessor: 'startedAt',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Day/Time Completed',
                accessor: 'completedAt',
                Filter: DefaultColumnFilter,
            },
        ],
        []
      )

    const data = grades.map(grade => {
        const results = grade.results;
        return grade.quiz_data.questions.sort((a, b) => a.number - b.number).map((question, index) => {
            return {
                key: `${grade.id}-${question.id}`,
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
                completedAt: `${grade.updated_at.slice(0,10)} - ${grade.updated_at.slice(11, 19)}`,
                startedAt: `${grade.start_time.slice(0,10)} - ${grade.start_time.slice(11, 19)}`,
            }
        })
    }).flat();

    async function handleExcelExport(rows) {
        const exportData = rows.map(row => {
            console.log(row)
            row.values.startedAt = `${row.values.startedAt.slice(0,10)}T${row.values.startedAt.slice(13)}Z`
            row.values.completedAt = `${row.values.completedAt.slice(0,10)}T${row.values.completedAt.slice(13)}Z`
            return row.values;
        })
       
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");

        worksheet.columns = [
            {header: 'First Name', key: 'firstName', width: 10},
            {header: 'Last Name', key: 'lastName', width: 32}, 
            {header: 'Username', key: 'username', width: 15},
            {header: 'Student ID', key: 'studentId', width: 15},
            {header: 'Test Name', key: 'testName', width: 15},
            {header: 'Test Category', key: 'testCategory', width: 15},
            {header: 'Test Score', key: 'testScore', width: 15},
            {header: 'Question Number', key: 'questionNumber', width: 15},
            {header: 'Correct?', key: 'correct', width: 15},
            {header: 'Day/Time Started', key: 'startedAt', width: 15},
            {header: 'Day/Time Completed', key: 'completedAt', width: 15},
          ];

      
        worksheet.addRows(exportData);
    
        const buffer = await workbook.xlsx.writeBuffer();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = '.xlsx';

        const blob = new Blob([buffer], {type: fileType});

        saveAs(blob, `${new Date()}-test-data` + fileExtension);

    }


    return (
        <div className="pt-5 flex justify-center">
        <div className="flex flex-col items-center">
            <p className="font-bold text-4xl text-th-title-text">Testing Data</p>
            <div className="w-full overflow-x-hidden overflow-x-scroll">
                <FilteredDataTable data={data} columns={columns} handleExcelExport={handleExcelExport}/>
            </div>
        </div>
    </div>
    )
}

export default TestDataContainer;

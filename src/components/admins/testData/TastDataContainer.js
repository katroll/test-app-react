import { useState, useEffect, useMemo } from "react";
import * as Excel from "exceljs";

import {saveAs} from "file-saver";

import SelectColumnFilter from "./SelectColumnFilter";
import DefaultColumnFilter from "./DefaultColumnFilter";
import CorrectAnswerFilter from "./CorrectAnswerFilter";

import FilteredDataTable from "./FilteredDataTable";

import changeTimeZone from "../../Utilities/ChangeTimeZone";


function TestDataContainer() {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch("https://morning-scrubland-82075.herokuapp.com/grades", {
            headers: {
                key: "04af711a-ca6c-11ec-9d64-0242ac120002"
            },
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
                completedAt: `${changeTimeZone(new Date(grade.updated_at), 'Asia/Kolkata')}`,
                startedAt: `${changeTimeZone(new Date(grade.start_time), 'Asia/Kolkata')}`,
            }
        })
    }).flat();

    async function handleExcelExport(rows) {
        const exportData = rows.map(row => {
            return row.values;
        })
       
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Testing Data");

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
            {header: 'Day/Time Started', key: 'startedAt', width: 30},
            {header: 'Day/Time Completed', key: 'completedAt', width: 30},
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

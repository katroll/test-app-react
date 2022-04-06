import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import { useMemo } from "react";

import ExportAll from "../ExportAll"


function FilteredDataTable({ data, columns, handleExcelExport }) {


    const filterTypes = useMemo(
        () => ({  
        text: (rows, id, filterValue) => {
            return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
        }),
        []
    )


    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
        columns,
        data,
        filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy
    )
  
    return (
      <div className="flex flex-col">
        <div className="flex w-full justify-end space-x-3">
            <ExportAll />
            <button
                className="p-2 rounded text-white bg-th-button hover:bg-th-green-button-hover text-th-light-text"
                onClick={() => handleExcelExport(rows)}>
                Export Table to Excel
            </button>
        </div>
        <div className="mt-2 max-h-[75vh] max-w-[75vw] overflow-x-scroll overflow-y-scroll bg-gray-50 rounded">
          <div className="flex flex-col">
            <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block overflow-hidden align-middle border-b border-gray-100 shadow sm:rounded-lg">
                    
                  <table {...getTableProps()} className="reletive">
                      <thead>
                      {headerGroups.map(headerGroup => (
                          <tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th key={column.Header} className="bg-th-table-header-bg text-th-light-text shadow px-3 h-10 text-lg">
                                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="w-48">
                                  {column.render("Header")}
                                  <span className="ml-3">
                                    {column.disableSortBy ? "" : column.isSorted ? column.isSortedDesc ? "↓" : "↑" : "⇵"}
                                  </span>
                                </div>
                                <div>
                                  {column.canFilter ? column.render("Filter") : null}
                                </div>
                              </th>
                          ))}
                          </tr>
                      ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                          prepareRow(row)
                          return (
                          <tr key={row.id} {...row.getRowProps()} className="">
                              {row.cells.map(cell => {
                              return <td key={`${cell.value}-${row.id}`} {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap border-b bg-th-card-bg border-gray-100 text-sm leading-5 text-gray-900">{cell.render('Cell')}</td>
                              })}
                          </tr>
                          )
                      })}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
      </div>
    </div>
    )
    }

export default FilteredDataTable;

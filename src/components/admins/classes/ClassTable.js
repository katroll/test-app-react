

function ClassTable({ spctc_class }) {

    return (
        <div className="flex flex-col items-center w-full px-10">
            <div className="w-full py-2 text-center text-th-light-text text-lg font-semibold bg-th-table-header-bg rounded-t tracking-wider">{spctc_class.name}</div>
            <div className="w-full pl-3 py-2 text-th-title-text font-semibold bg-th-light-gray-bg border-b border-b-th-border">Students</div>
            <div className="w-full pl-3 py-2 text-th-title-text font-semibold bg-th-light-gray-bg">Tests</div>
        </div>
    )
}

export default ClassTable;
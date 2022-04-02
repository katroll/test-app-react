import { useMemo } from "react"

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id }, }) {


    const options = useMemo(() => {
        const options = ["beginner", "intermediate", "advanced", "english", "misc"]
        return [...options.values()]
    }, [])


    return (
        <select
        value={filterValue}
        onChange={e => {
            setFilter(e.target.value || undefined)
        }}
        className="rounded ml-8 text-sm text-navy-900 focus:outine-none"
        >
        <option value="">All</option>
        {options.map((option, i) => (
            <option key={i} value={option}>
            {option}
            </option>
        ))}
        </select>
    )

}

export default SelectColumnFilter;
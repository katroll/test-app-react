

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        className="rounded ml-3 py-1 text-xs text-navy-900 pl-2 focus:outline-none"
      />
    )
  }

export default DefaultColumnFilter;
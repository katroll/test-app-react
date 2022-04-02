import Flatpickr from "flatpickr";
import moment from 'moment';


function DateRangeFilter({ column: {filterValue, setFilter, preFilteredRows, id } })  {

    const dates = preFilteredRows.map((val) => moment(val.original[id]))
    console.log(dates);
    const minDate = moment.min(dates).subtract(1,'day') // To include the date
    const maxDate = moment.max(dates).add(1, 'day')

    return (
        <>
            <Flatpickr
            className='form-control'
            onChange={(date) => {
                if (date.length === 2) {
                setFilter([date[0],date[1]])
                }
            }}
            options={{
                enable: [
                {
                    from: minDate.toDate(),
                    to : maxDate.toDate()
                }
                ],
                mode : 'range'
            }}
            />
    
        </>
    )

}

    export default DateRangeFilter;
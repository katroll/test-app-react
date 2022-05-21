function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
        return new Date(
        new Date(date).toLocaleString('en-US', {
            timeZone,
        }),
        );
    }
    
    const kolkataTime =  new Date(
        date.toLocaleString('en-US', {
        timeZone
        }),
    );

    return kolkataTime.toLocaleString('en-US');
}

export default changeTimeZone;
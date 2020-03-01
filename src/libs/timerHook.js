import { useState, useEffect } from 'react';

export function useNewTimer(curDate) {
    const [date, setDate] = useState(curDate);

    useEffect(() => {
        let timerId = setInterval(() => tick(), 1000);
        return function cleadup(){
            clearInterval(timerId);
        };
    });

    function tick() {
        setDate(new Date());
    }

    return date;
}
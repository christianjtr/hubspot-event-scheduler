import _ from 'lodash';
import { calcDiffInDaysBetweenTwoDates } from '../utils/dateUtils.js';

const getTotalAttendeesPerDate = (data) => {
    const sortedUniqueAvailableDates = [...new Set(data.map(({ availableDates }) => availableDates).flat())].sort();
    const attendeesPerDate = sortedUniqueAvailableDates.map((availableDate) => {
        const attendees = data
            .filter(({ availableDates }) => availableDates.includes(availableDate))
            .map(({ email }) => email);
        
        return {
            date: availableDate,
            attendees,
            attendeeCount: attendees.length,

        };
    });

    return attendeesPerDate;
};

const getEventSchedule = (attendeesPerDate) => {
    const eventSchedules = attendeesPerDate.map((item, index, array) => {
        const nextPosition = index + 1;
        if(array[nextPosition] && calcDiffInDaysBetweenTwoDates(item.date, array[nextPosition].date) === 1) {
            const attendees = _.intersectionWith(item.attendees, array[nextPosition].attendees, _.isEqual);
            return {
                startDate: attendees.length > 0 ? item.date : null,
                attendees,
                attendeeCount: attendees.length,        
            };
        }
    })
    .filter((item) => !!item);

    return _.maxBy(eventSchedules, 'attendeeCount');
};

const generateEventSchedulesPerCountry = (partners) => {
    let result = [];
    const partnersGroupedByCountry = _.groupBy(partners, 'country');
    const countries = Object.keys(partnersGroupedByCountry);

    result = countries.map((country) => {
        const attendeesPerDate = getTotalAttendeesPerDate(partnersGroupedByCountry[country]);
        const eventSchedule = getEventSchedule(attendeesPerDate);

        return {
            ...eventSchedule,
            name: country,
        };
    });
    
    return {
        countries: result,
    };
}

export {
    generateEventSchedulesPerCountry,
};

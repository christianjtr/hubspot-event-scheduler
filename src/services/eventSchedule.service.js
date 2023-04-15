import APIService from '../api/index.js';

const sendOutEventSchedulesPerCountry = async (payload = {}) => {
    let data = undefined;
    try {
        const response = await APIService.post('/problem/result', payload);
        data = await response.json();
        return data;
    } catch(error) {
        throw new Error(`An error has occurred when sending in the event schedules: ${error}`);
    } finally {
        console.info(data);
    }
};

export {
    sendOutEventSchedulesPerCountry,
};

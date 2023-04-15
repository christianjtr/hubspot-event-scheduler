import APIService from '../api/index.js';

const getAllPartners = async () => {
    try {
        const response = await APIService.get('/problem/dataset');
        const data = await response.json();
        return data ? data.partners : [];
    } catch(error) {
        throw new Error(`An error has occurred when getting all partnerts: ${error}`);
    }
};

export {
    getAllPartners,
};

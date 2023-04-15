const calcDiffInDaysBetweenTwoDates = (a, b) => {
    const diff = new Date(b).getTime() - new Date(a).getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
};

export {
    calcDiffInDaysBetweenTwoDates,
};

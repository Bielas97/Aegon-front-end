export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const formatTimestamp = timestamp => {
    const dateTime = timestamp.split('T');
    const hourMiliseconds = dateTime[1].split('.');
    return dateTime[0].concat(' ').concat(hourMiliseconds[0]);
};

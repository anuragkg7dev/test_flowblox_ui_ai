export const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
};


export const getDateString = (date) => {
    return date ? date.toISOString().split('T')[0] : undefined;
}

export const getStringToDate = (dateString) => {
    return  dateString ? new Date(dateString) : null;
}



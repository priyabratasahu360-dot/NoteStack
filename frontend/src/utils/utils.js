export const convertToLocal = (date) => {
    // convert to js date object
    const dateObj = new Date(date);
    
    return dateObj.toLocaleString();
}
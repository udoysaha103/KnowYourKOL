export const formatAge = (creationTimestamp) => {
    const now = new Date();
    const creationDate = new Date(creationTimestamp);
    const diffInMilliseconds = now - creationDate;

    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30.44; // Average days in a month
    const millisecondsInYear = millisecondsInDay * 365.25; // Accounting for leap years

    if (diffInMilliseconds < millisecondsInDay) {
        const hours = Math.floor(diffInMilliseconds / millisecondsInHour);
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (diffInMilliseconds < millisecondsInMonth) {
        const days = Math.floor(diffInMilliseconds / millisecondsInDay);
        return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (diffInMilliseconds < millisecondsInYear) {
        const months = Math.floor(diffInMilliseconds / millisecondsInMonth);
        const days = Math.floor((diffInMilliseconds % millisecondsInMonth) / millisecondsInDay);
        return `${months} month${months !== 1 ? 's' : ''} ${days} day${days !== 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(diffInMilliseconds / millisecondsInYear);
        const months = Math.floor((diffInMilliseconds % millisecondsInYear) / millisecondsInMonth);
        return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
}

// Example usage:
// const creationTimestamp = 1737196771000; // Example: January 18, 2025
// console.log(formatAge(creationTimestamp));
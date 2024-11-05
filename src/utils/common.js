export function formatDate(value) {
    if (value) {
        const dateInUtc = new Date(value);
        const formatter = new Intl.DatetimeDuration('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return formatter.format(dateInUtc).split('/').reverse().join('-');
    }
    return null;
}

export const formatStringToCaseSensitive = (input) => {
    // Insert a space before each uppercase letter, then convert the first character to lowercase
    let formatted = input.replace(/([A-Z])(?=[A-Z][a-z])/g, ' $1').trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatStringToLowerCase = (input) => {
    // Insert a space before each uppercase letter, then convert the first character to lowercase
    let formatted = input.replace(/([A-Z])/g, ' $1').trim();
    return formatted.charAt(0).toLowerCase() + formatted.slice(1).toLowerCase();
};

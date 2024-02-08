/**
 * Represents the configuration for columns in a table or similar UI component.
 * @typedef {Object} ColumnConfig
 * @property {string} name - The name of the column.
 * @property {string} label - The label or title of the column.
 * @property {number} width - The width of the column in pixels.
 * @property {string} align - The alignment of the column content ('left', 'center', or 'right').
 * @property {string} action - The alignment of the column content ('left', 'center', or 'right').
 * @property {Function} template - A function used to format the content of the column.
 */

/**
 * Configuration array for columns.
 * @type {Array<ColumnConfig>}
 */
const columns = [
    /** @type {ColumnConfig} */
    { name: "text", label: "Task Name", width: "100%", template: task => task.text },
    { name: "start", label: "Start Date", width: "100px", align: "left", template: task => formatDate(task.start_date, "yyyy-MM-dd") },
    // { name: "end", label: "End Date", width: 150, align: "left", template: task => formatDate(task.end_date, "yyyy-MM-dd") },
    { name: "duration", label: "Duration", width: "70px", align: "right", template: task => calculateDuration(task.end_date, task.start_date).toString() },
    { name: "add-task", label: "Add Task", width: "50px", align: "center", action: "add-task", template: () => "add" },
];

/**
 * Formats a date object into a string representation using the specified format.
 * @param {Date} date - The date object to format.
 * @param {string} format - The desired format string.
 * @returns {string} The formatted date string.
 */
function formatDate(date, format) {
    // Ensure the input date is valid
    if (!(date instanceof Date)) {
        throw new TypeError('Invalid date object');
    }

    // Define format tokens and their corresponding values
    const tokens = {
        'yyyy': date.getFullYear(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'dd': String(date.getDate()).padStart(2, '0'),
        'HH': String(date.getHours()).padStart(2, '0'),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0'),
        // Add more tokens as needed for additional date components (e.g., milliseconds)
    };

    // Replace format tokens with corresponding values
    return format.replace(/(yyyy|MM|dd|HH|mm|ss)/g, token => tokens[token] || token);
}

/**
 * Calculates the duration between two dates in days.
 * @param {Date} endDate - The end date.
 * @param {Date} startDate - The start date.
 * @returns {number} The duration in days.
 */
export function calculateDuration(endDate, startDate) {
    // Ensure the input dates are valid
    if (!(endDate instanceof Date) || !(startDate instanceof Date)) {
        throw new TypeError('Invalid date objects');
    }

    // Calculate the difference in milliseconds between the end and start dates
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert the difference to days and return
    const durationInDays = Math.round(timeDifference / millisecondsPerDay);
    return durationInDays;
}

// Export the columns array for use in other modules
export default columns;
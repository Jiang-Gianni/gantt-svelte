export function placeLink(t, e, a) {
    // Parameters:
    // t: Container element's position and size information
    // e: Starting point (coordinates) of the rectangle
    // a: Ending point (coordinates) of the rectangle

    // Check if both starting and ending points are provided
    if (e && a) {
        // Calculate the differences in coordinates between the ending and starting points
        const n = a.x - e.x; // Difference in x-coordinates
        const r = a.y - e.y; // Difference in y-coordinates

        // Calculate the position of the rectangle relative to the container
        const i = (n > 0 ? e.x : a.x) - t.left; // Horizontal position (left) of the rectangle
        const s = (r > 0 ? e.y : a.y) - t.top; // Vertical position (top) of the rectangle

        // Construct a string representing the CSS 'padding' property
        const o = `${n > 0 ? 0 : -n},${r > 0 ? 0 : -r},${n > 0 ? n : 0},${r > 0 ? r : 0}`;

        // Return an object representing the position and dimensions of the rectangle
        return {
            width: Math.abs(n), // Width of the rectangle (absolute value of the difference in x-coordinates)
            height: Math.abs(r), // Height of the rectangle (absolute value of the difference in y-coordinates)
            left: i, // Horizontal position (left) of the rectangle relative to the container
            top: s, // Vertical position (top) of the rectangle relative to the container
            p: o // String representation of CSS 'padding' property
        };
    }
    // If starting and ending points are not provided, return null
    return null;
}
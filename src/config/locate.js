/**
 * Finds the nearest ancestor element with a "data-id" attribute,
 * starting from the target element or event object.
 * @param {Event | HTMLElement} targetOrEvent - The target element or event object.
 * @returns {HTMLElement | null} The nearest ancestor element with a "data-id" attribute, or null if not found.
 */
export function locate(targetOrEvent) {
    let element = !targetOrEvent.tagName && targetOrEvent.target ? targetOrEvent.target : targetOrEvent;

    while (element) {
        if (element.getAttribute) {
            if (element.getAttribute("data-id")) {
                return element;
            }
        }
        element = element.parentNode;
    }
    return null;
}

/**
 * Retrieves the "data-id" attribute value from the nearest ancestor element
 * with a "data-id" attribute, starting from the target element or event object.
 * @param {Event | HTMLElement} targetOrEvent - The target element or event object.
 * @returns {string | null} The value of the "data-id" attribute, or null if not found.
 */
export function locateID(targetOrEvent) {
    const elementWithDataId = locate(targetOrEvent);
    return elementWithDataId ? elementWithDataId.getAttribute("data-id") : null;
}
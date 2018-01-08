// Export Constants

export const REDIRECT = 'REDIRECT';

// Export Actions

export function redirect(page) {
    return {
        type: REDIRECT,
        payload: page
    }
};
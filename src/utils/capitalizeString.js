/**
 * Capitalizes the first letter of each word in a given string,
 * including support for accented characters and numbers.
 * @param {string} str - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalizeWords = (str, locale = 'en-US') => {
    // console.log("capitalizeWords str: ",str)
    // console.log("capitalizeWords locale: ",locale)
    if (!str) return '';
    return str
        .split(' ')
        .map(word => 
            word.charAt(0).toLocaleUpperCase(locale) + word.slice(1).toLocaleLowerCase(locale)
        )   
        .join(' ')
};
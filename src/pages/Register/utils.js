const MINIMUM_PASSWORD_LENGTH = 8;

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    return hasSpecialCharacter(password) && hasNumber(password) && hasMinimumLength(password);
};

const hasSpecialCharacter = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(password);
};

const hasNumber = (password) => {
    const numberRegex = /\d/;
    return numberRegex.test(password);
};

const hasMinimumLength = (password) => {
    return password.length >= MINIMUM_PASSWORD_LENGTH;
};
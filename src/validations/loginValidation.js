export const isValidEmail = (email) => {

    if (!email) {
        return "Please write your email.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return "The email entered is not in a valid format.";
    }

    return true;

};


export const isValidPassword = (password) => {

    if (!password) {
        return "Please enter your password.";
    }

    if (password.length < 8) {
        return "password must have 8 or more characters";
    }

    return true;

};
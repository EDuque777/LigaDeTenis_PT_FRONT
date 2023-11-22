export const isValidName= (name) => {
    if (!name) {
        return "Please enter your name";
    }
    return true;
};


export const isValidLastName = (lastName) => {
    if (!lastName) {
        return "Please enter your last name";
    }
    return true;
};

export const isValidMobilePhone = (mobilePhone) => {
    if (!mobilePhone) {
        return "Please enter your mobile number.";
    }
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(mobilePhone)) {
        return "Only numbers are allowed in this field.";
    }
    if(mobilePhone.length < 10) {
        return "Please enter at least 10 characters.";
    }
    return true;
};


export const isValidBirthdate = (birthdate) => {
    if (!birthdate) {
        return "Please write your date of birth.";
    }
    const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthdateRegex.test(birthdate)) {
        return "The date of birth must be in the format day/month/year"
    }
    return true;
};


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


export const isValidConfirmPassword = (password, confirmPassword) => {
    if (!password) {
        return "Please enter your password.";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return true;
};


export const isValidUsername = (username) => {
    if (!username) {
        return "Please enter your username.";
    }
    return true;
};


export const isValidNationality = (nationality) => {
    if (!nationality) {
        return "Please enter your nationality";
    }
    return true;
};


export const isValidGender = (gender) => {
    if (!gender) {
        return "Please enter your gender";
    }
    if(gender !== 'Male' && gender !== 'Female'){
        return 'Gender must be "Male" or "Female'
    }
    return true;
};

export const isValidRole = (roleUser) => {
    if (!roleUser) {
        return "Please enter your role";
    }
    return true;
};
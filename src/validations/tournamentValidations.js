export const isValidName= (name) => {
    if (!name) {
        return "Please enter the title";
    }
    return true;
};


export const isValidParticipants = (value) => {
    if (!value) {
        return "Enter the number of participants";
    }
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(value)) {
        return "Please enter only numbers";
    }
    return true;
};


export const isValidStartDate = (start) => {
    if (!start) {
        return "Please enter start date";
    }
    const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthdateRegex.test(start)) {
        return "The date must be in this format: day/month/year"
    }
    return true;
};


export const isValidPrize = (prize) => {
    if (!prize) {
        return "Please enter the prize";
    }
    const prizeRegex = /^\d+\.\d{2}$/;
    if (!prizeRegex.test(prize)) {
        return "Please enter a number with two decimals (e.g., 100.00)";
    }
    return true;
};


export const isValidPrice = (price) => {
    if (!price) {
        return "Please enter the price";
    }
    const prizeRegex = /^\d+\.\d{2}$/;
    if (!prizeRegex.test(price)) {
        return "Please enter a number with two decimals (e.g., 100.00)";
    }
    return true;
};


export const isValidCountry = (country) => {
    if (!country) {
        return "Please enter the country of location";
    }
    return true;
};
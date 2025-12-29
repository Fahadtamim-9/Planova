export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ;
} ;

export const addThousandsSeparator = (num) =>{
    if (numm==null || isNaN(num)) return "";
    const [integrPart,fractionalPart] = num.toString().split(".");
    const formattedInteger = integrPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}`
     : formattedInteger;
};
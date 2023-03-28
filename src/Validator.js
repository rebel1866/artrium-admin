function isValid(newPaint, setValidation) {
    let isValid = true;
    if (newPaint.name === '') {
        setValidation(values => ({ ...values, name: 'Name must not be blank' }));
        isValid = false;
    }
    if (newPaint.price <= 0) {
        setValidation(values => ({ ...values, price: 'Price must be greater than 0' }));
        isValid = false;
    }
    if (newPaint.year <= 0) {
        setValidation(values => ({ ...values, year: 'Year must be greater than 0' }));
        isValid = false;

    }
    if (newPaint.year > 3000) {
        setValidation(values => ({ ...values, year: 'I doubt you could live so long' }));
        isValid = false;
    }
    return isValid;
}

export default isValid;
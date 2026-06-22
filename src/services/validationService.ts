export function validateData(inputType: string, value: string | number | boolean) {
    let isValid = false;
    value = value && typeof value === 'string' ? value.trim().replace(/[<>]/g, "") : value;
    switch(inputType) {
        case 'text':
            isValid = value != null && (<string>value).length > 0;
            break;
        case 'number':
            isValid = /^\d+$/.test(value.toString());
            break;
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(<string>value);
            break;
        case 'tel':
            isValid = /^\+?[0-9\s\-()]{7,20}$/.test(<string>value);
            break;
    }
  
  return isValid;
}
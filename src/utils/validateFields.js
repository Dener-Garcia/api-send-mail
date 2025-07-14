function fieldEmpty(input) {

    if (input === null || input === undefined) return true

    if (typeof input === 'string' && input.trim() === '') return true

    if (Array.isArray(input) && input.length === 0) return true;

    if (typeof input === 'object' && Object.keys(input).length === 0) return true;

    console.log("validei")
    return false;

}

function checkFields(objectFields) {
    const emptyFields = []
    for (const key in objectFields) {
        if (fieldEmpty(objectFields[key])) {
            emptyFields.push(key);
        }
    }
    if (emptyFields.length > 0) throw new Error("campos vazios " + emptyFields)
}


module.exports = {
    fieldEmpty,
    checkFields
}





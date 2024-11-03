function parseFormData(fields, body) {
    const parsedData = {};

    fields.forEach(field => {
        if (body[field]) {
            try {
                parsedData[field] = JSON.parse(body[field]);
            } catch (error) {
                throw new Error(`El campo ${field} tiene un formato JSON inválido`);
            }
        } else {
            parsedData[field] = null; // Si no está presente el campo, lo deja como null
        }
    });

    return parsedData;
}

module.exports = parseFormData;
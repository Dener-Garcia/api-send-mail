async function contactAmperTech(data, fil) {

    const anexos = fil.map(file => ({
        filename: file.originalname,
        path: file.path
    }));

    try {
        console.log("dentro do service", data, anexos)
    } catch (error) {
        
    }
}

module.exports = {
    contactAmperTech
}
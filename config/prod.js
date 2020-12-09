module.exports = {
    //old
    // MONGOURI: "mongodb+srv://bharath:jXMRyuHgeaz8RXWR@cluster0.x7vz9.mongodb.net/<dbname>?retryWrites=true&w=majority",
    //New
    MONGOURI: process.env.MONGOURI,
     JWT_TOKEN: process.env.JWT_SEC
}
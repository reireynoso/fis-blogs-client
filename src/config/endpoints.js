module.exports = {
    server: process.env.NODE_ENV === "production" ? null : "http://localhost:4000",
    client: process.env.NODE_ENV === "production" ? null : "http://localhost:3000"
}
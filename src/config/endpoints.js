module.exports = {
    server: process.env.NODE_ENV === "production" ? "https://coding-blogs-api.herokuapp.com" : "http://localhost:4000",
    client: process.env.NODE_ENV === "production" ? "https://fis-blogs-client.web.app" : "http://localhost:3000"
}
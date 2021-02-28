module.exports = {
    server: process.env.NODE_ENV === "production" ? "https://coding-blogs-api.herokuapp.com" : "http://localhost:4000",
    client: process.env.NODE_ENV === "production" ? "https://codingblogs.net" : "http://localhost:3000"
}
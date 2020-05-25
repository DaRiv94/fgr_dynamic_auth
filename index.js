const app = require("./app");

port = process.env.PORT || 4000
app.listen(port, (err) => {
    if (!err) {
        console.log(`Listening on port: ${port}`)
    }
})
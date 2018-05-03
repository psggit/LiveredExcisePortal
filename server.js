const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dist'))
app.listen(8080)
console.log('Server is running on port 8080')

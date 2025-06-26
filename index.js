const express = require("express");

const server = express();

server.get('/curso', (req, res) => {
    console.log(req)
    return res.json({'ola': 'mundo'})
})

server.listen(3000);
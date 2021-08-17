const express = require('express');
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/dist'));

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function () {
    console.log(`Listening on port  ${PORT}!`);
});
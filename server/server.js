const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function () {
    console.log(`Listening on port  ${port}!`);
});
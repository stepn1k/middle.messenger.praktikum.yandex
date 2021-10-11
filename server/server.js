const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const distPath = `${__dirname}/../dist`;

app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.resolve(`${distPath}/index.html`));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes.js");

const PORT = process.env.PORT || 4000;

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


require('dotenv').config();

const express = require('express');
const router = require("./routes");
const bodyParser = require('body-parser')

const app = express(),
    PORT = process.env.PORT || 3121;

require("./db")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

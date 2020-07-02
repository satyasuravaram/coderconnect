const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.get("/", (req, res) => {
    console.log("");
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})
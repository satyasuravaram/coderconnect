require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



//Connect to mongoose
mongoose
    .connect("mongodb://localhost:27017/coderconnect_login_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

//Routes
app.use("/users", require('./routes/users'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})
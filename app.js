const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB CONNECTED'));

mongoose.connection.on("error", err => {
    console.log(`DB CONNECTION ERROR : ${err.message}`);
});

const ItemRoutes = require('./routes/Items');
// const AuthRoutes = require('./routes/Auth');
// const UsersRoutes = require('./routes/Users');

app.use("/", ItemRoutes);
// app.use("/", AuthRoutes);
// app.use("/", UsersRoutes);

app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
const port = 5000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})


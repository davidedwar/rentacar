const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const ItemRoutes = require('./routes/Items');
const UsersRoutes = require('./routes/Users');
require('dotenv').config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use("/", ItemRoutes);
app.use("/", UsersRoutes);
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('DB CONNECTED'));

mongoose.connection.on("error", err => {
    console.log(`DB CONNECTION ERROR : ${err.message}`);
});

const port = 5000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})


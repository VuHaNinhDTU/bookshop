const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Sửa process.PORT thành process.env.PORT
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())
app.use(cookieParser())

routes(app);

mongoose.connect(`mongodb+srv://tuyen:${process.env.MONGO_DB}@cluster0.piohf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB');
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

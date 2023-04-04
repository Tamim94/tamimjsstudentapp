
let cors = require('cors');
const dbConfig = require('./database/db');
// Express Route
const studentRoute = require('../backend/routes/student.route')
console.log();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connecting mongoDB Database
//mongoose.Promise = global.Promise;
/*mongoose.connect(dbConfig.db, {// mongodb://localhost:27017/studentdb'
    useNewUrlParser: true
})*/
mongoose.connect('mongodb://127.0.0.1:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log('Database sucessfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)
    }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/students', studentRoute)


// PORT
// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
// 404 Error




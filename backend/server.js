const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const noteRoutes = require('./routes/item.route');
const userRoutes = require('./routes/user.route');
const app = express();

mongoose.connect('mongodb+srv://Tharu:Tharu12345@cluster0.nhnlbou.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(bodyParser.json());
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
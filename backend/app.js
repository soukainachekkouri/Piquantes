const express = require('express');
const app = express();

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect("mongodb+srv://root:root@cluster0.2ex4l.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log(e));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
        'Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE,PATCH,OPTIONS')
    next()
});



app.use('/api/auth', userRoutes);
app.use("/api/sauces", sauceRoutes);


module.exports = app;
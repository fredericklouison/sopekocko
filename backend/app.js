const express = require('express');
const dotenv =require ( 'dotenv' ) . config ( )
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const sauceRoutes = require('./routes/sauces');
const path = require('path');
const app= express()
mongoose.connect('mongodb+srv://'+process.env.DB_LOGIN+':'+process.env.DB_PASS+'@cluster0.hvhhp.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces',sauceRoutes)
module.exports=app
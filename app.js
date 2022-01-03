const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const databaseURI = 'ENTER_DATABASE_URI_HERE';
mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/footer-date')
const port = 3000;
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log("Escuchando...");
})

app.post('/search', (req, res) => {

})
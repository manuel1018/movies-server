const express = require('express');
const app = express();
const hbs = require('hbs');

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
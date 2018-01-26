const express = require('express');
const hbs = require('hbs');
const sclib = require('./xtlib/sc.js');
const fs = require('fs');

const port = process.env.PORT || 3000;



var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', sclib.sc);

app.set('view engine','hbs');


//middleware
app.use( (req, res, next ) => {

  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('imposible generar el log');
    }
  })

  console.log(log);
  next();
});

//middleware
// app.use ((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
  // res.send('<h1>hello</h1>');

  // res.send({
  //   name: 'Oscar',
  //   likes: [
  //     'motos',
  //     'cine'
  //   ]
  // });

  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Bienvenidos'
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res)=> {


  res.send({
    errorMessage: 'Errocillo'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

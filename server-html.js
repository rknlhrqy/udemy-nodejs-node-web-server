const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.get('/about', (request, response) => {
  response.render('about.html', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});
app.get('/', (request, response) => {
  response.render('home.html', {
    pageTitle: 'Home Page',
    message: 'Welcome to my Website!',
    currentYear: new Date().getFullYear()
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/bad', (request, response) => {
  response.send({
    error: 'Unable to serve your request!'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

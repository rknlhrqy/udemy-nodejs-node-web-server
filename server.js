const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

/* Create Partials
 */
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('setUpperCase', (text) => {
  return text.toUpperCase();
});

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

/*
app.use((request, response, next) => {
  response.render('maintenance.hbs');
});
*/
/*
 * Solution #2 -- Use static webpage
 */
app.use(express.static(__dirname + '/public'));

/*
 * Solution #3 -- Use hbs view engine for Handlebars.
 */
app.set('view engine', 'hbs');
app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to my Website!',
    message2: 'This is my website!'
  });
});

/*
 * Solution #1 -- use simple response
 */
app.get('/bad', (request, response) => {
  response.send({
    error: 'Unable to serve your request!'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

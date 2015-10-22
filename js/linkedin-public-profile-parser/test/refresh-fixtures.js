var fs      = require('fs');
var Wreck   = require('wreck');
var agent   = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3';
var wreck   = Wreck.defaults({
    headers: { 'User-Agent': agent }
});
var cheerio = require('cheerio');
var chalk   = require('chalk');
var urls    = [
  'https://www.linkedin.com/pub/abdi-ahmed/100/384/6b0', // Abdi
  'https://www.linkedin.com/in/emusk',                   // Elon
  'https://uk.linkedin.com/in/simonlab',                 // Simon
  'https://uk.linkedin.com/in/iteles',                   // Inês
  'https://www.linkedin.com/in/nelsonic',                // This Guy
  'https://uk.linkedin.com/pub/z%C3%BCmra-kinali/2b/731/b5b', // empty profile
  'https://uk.linkedin.com/pub/benjamin-lees/58/75/162'  //benji
];
var files   = [
  'abdi-ahmed.html',
  'emusk.html',
  'simonlab.html',
  'iteles.html',
  'nelsonic.html',
  'zumra.html', // random person with empty profile. test failure.
  'benji.html'
];

var fetcher = require('../lib/fetcher');

function req (index) {
  var url = urls[index];
  var file = __dirname + '/fixtures/' + files[index];
  fetcher(url, function(err, url, html){
    fs.writeFile(file, html.toString(), function(err, data){
      console.log('done');
    })
  })
}

for(var i = 0; i < urls.length; i++) {
  req(i);
}

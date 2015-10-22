var lp = require('../lib/');
var url = 'https://www.linkedin.com/in/bryanopalko';

var jsonfile = require('jsonfile')
 
var file = 'data.json'
var obj = {name: 'JP'}

var data_total;
var j1;

lp(url, function(err, data){
  console.log(JSON.stringify(data,null,2));  
 
  jsonfile.writeFile(file, data, function (err) {
    console.error(err)
  }) 
})


var cheerio = require('cheerio');
/**
 * profile method finds data in a give public profile page
 * @param {String} url - a valid Linkedin profile url
 * @param {String} html - the full html for the public profile page
 * @param {Function} next - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {Objectj} error an error object (set to null if no error occurred)
 *  @param {Object} data - the complete Linkedin Profile for the given url
 */
module.exports = function profile(url, html, next) {
  var $ = cheerio.load(html); // use Server-Side JQuery to access DOM
  var data = { url: url };    // store all parsed data inside data object
  var i = 0;                  // we re-use this in all our for loops below
  var id;                     // id of DOM node being searched
  var exp = {};               // experience object
  var h5;                     // in experience there are several h5 tags
  var date;                   // dates in profile e.g: when job started/ended
  var con = $('.member-connections strong').text();
  if(con.match(/500/)) {
    data.connections = 500;
  }
  else {
    data.connections = parseInt(con.slice(0, con.length/2), 10)
  }

  data.fullname = $('.full-name').text();
  data.location = $('#location .locality').text();
  data.current = $('#overview-summary-current').text();
  data.current = data.current.slice(7, -1); // remove the word "Current"
  data.picture = $('.profile-picture img').attr('src');
  data.summary = $('.summary').text(); // element always present on page

  var skills = $('.endorse-item-name-text');
  data.skills = [];
  if(skills.length > 0) {
    for(i = 0; i < skills.length; i++) {
      data.skills.push(skills[i].children[0].data)
    }
  }

  var langs = $('#languages-view .section-item')
  if(langs.length > 0) {
    data.languages = [];
    for(i = 0; i < langs.length; i++) {
      var lang = langs[i].children[0].children[0].children[0].data;
      var fluency = '';
      if(langs[i].children[1]) {
        fluency = langs[i].children[1].children[0].data;      
      }
      data.languages.push(lang + ' - ' + fluency);
    }
  }
  // current experience / Work
  data.experience = { current: [], past: [] }; // empty if none listed
  var current = $('.current-position');
  if(current.length > 0) {
    for(i = 0; i < current.length; i++) {
      exp = {}; // reset experience object
      id = current[i].attribs.id;
      exp.title = $('#'+id +' h4 a').text();
      h5 = $('#'+id +' h5')
      if(h5.length > 1) { // there are two H5 headers in the experience div!
        // exp.logo = $('#'+id +' h5.experience-logo img').attr('src');
        exp.org = h5[1].children[0].children[0].data.trim();
      } else {
        exp.org = h5[0].children[0].children[0].data.trim();
      }
      date = $('#'+id +' .experience-date-locale').text().trim();
      exp.date = date.slice(0, date.indexOf(')')) + ')';
      exp.locaion = $('#'+id +' .locality').text().trim();
      exp.desc = $('#'+id +' .description').text().trim();
      data.experience.current.push(exp);
    }
  }
  // we could attempt to "DRY" this out ... Later!! First make it work!
  var past = $('.past-position');
  if(past.length > 0) {
    for(i = 0; i < past.length; i++) {
      exp = {}; // reset experience object
      id = past[i].attribs.id;
      exp.title = $('#'+id +' h4 a').text();
      h5 = $('#'+id +' h5')
      if(h5.length > 1) {
        // exp.logo = $('#'+id +' h5.experience-logo img').attr('src');
        exp.org = h5[1].children[0].children[0].data.trim();
      } else {
        exp.org = h5[0].children[0].children[0].data.trim();
      }
      date = $('#'+id +' .experience-date-locale').text().trim();
      exp.date = date.slice(0, date.indexOf(')')) + ')';
      exp.locaion = $('#'+id +' .locality').text().trim();
      exp.desc = $('#'+id +' .description').text().trim();
      data.experience.past.push(exp);
    }
  }
  next(null, data);
}

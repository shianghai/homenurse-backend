// we need axios to make HTTP requests
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

// First lets get some search data from News API

var content;

exports =function (index){
  

// Build the URL we are going request. This will get articles related to Apple and sort them newest first
let url = 'https://newsapi.org/v2/everything?' +
'q=Health&' +
'sortBy=publishedAt&' +
'apiKey=cc456e085bb84f19b96f15468198a07e';


// Make the request with axios' get() function
axios.get(url).then(function(r1) {

    // At this point we will have some search results from the API. Take the first search result...
    let firstResult = r1.data.articles[index];

  // ...and download the HTML for it, again with axios
  axios.get(firstResult.url).then(function(r2) {

    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url: firstResult.url
    });

    // now pass the DOM document into readability to parse
    let article = new Readability(dom.window.document).parse();
    content = article.textContent;
    // Done! The article content is in the textContent property
    
    
  })
})


  
  return content;
}
module.exports = content;
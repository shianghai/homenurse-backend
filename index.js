const  express = require('express')
const route = process.env.PORT || 3000
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

let url = 'https://newsapi.org/v2/everything?' +
'q=Health&' +
'sortBy=publishedAt&' +
'apiKey=cc456e085bb84f19b96f15468198a07e';



const app = express();


app.get('/news/:index', (req, res)=>{
        axios.get(url).then(function(r1) {
        let firstResult = r1.data.articles[req.params.index];
         axios.get(firstResult.url).then(function(r2) {
        let dom = new JSDOM(r2.data, {
          url: firstResult.url
        });
    
        let article = new Readability(dom.window.document).parse();
        res.send(article.textContent);
        
      })
    })
    
});

app.get('/notifications', (req, res)=>{
    res.send('you got notifications')
});

app.listen(route, ()=>{console.log("server started at: ", process.env.PORT || 3000)});
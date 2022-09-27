import express from 'express'
import GetNews from './getNews.cjs';

const app = express();


app.get('/news/:index', (req, res)=>{
    res.send('you got news with ' + req.params.index);
    GetNews(req.params.index);
});

app.get('/notifications', (req, res)=>{
    res.send('you got notifications')
});

app.listen(4005);
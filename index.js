import express from 'express'
import GetNews from './getNews.cjs';
const route = process.env.PORT || 3000
import cors from 'cors'


const app = express();

app.use(cors())
app.get('/news/:index', (req, res)=>{
    res.send(GetNews(req.params.index));
    
});

app.get('/notifications', (req, res)=>{
    res.send('you got notifications')
});

app.listen(route, ()=>{console.log("server started at: ", process.env.PORT || 3000)});
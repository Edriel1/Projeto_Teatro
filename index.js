const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.get('/', function (req, res) {
    const f = "f"
    res.status(200).json(f);
});

app.get("/test", (req, res, next) => {
    console.log("'/test' call");
    axios.get(`https://www.supersaas.com/api/range/${process.env.schedule_id}.json?api_key=${process.env.admin_id}`)
      .then(data => res.status(200).json(data.data.bookings))
      .catch(err => res.status(500).json({ error: err.message }));
  });


app.post('/api', async (req, res) => {
    try {

        axios.post(`https://www.supersaas.com/api/bookings.json?schedule_id=${process.env.schedule_id}&api_key=${process.env.admin_id}`,
            {full_name: "testes1", start:"2024-07-24 17:00:00", finish:"2024-07-24 17:10:00"}).then(e => {
                res.status(200).json(e.data);
            }).catch(e => {console.log('Erro')});
 
    } catch (error) {
        console.error('Erro na requisição à API externa:', error);
        res.status(500).json({ error: 'Erro na requisição à API externa' });
    }
});
app.get('/disponiveis', (req, res) => {
    axios.get(`https://www.supersaas.com/api/free/${process.env.schedule_id}.json?from=2024-07-24 00:00:00&api_key=${process.env.admin_id}`).then(e => {
        res.status(200).json(e.data);
    }).catch(e => {console.log('Erro')});
});

app.listen(3000, () => console.log(`Server running on port: http://localhost:3000/`))
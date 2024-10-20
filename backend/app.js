require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/config');
// const cors = require('cors');

const app = express();
app.use(express.json());
connectDB();

/*
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  }));
app.use(express.json());
*/

app.use('/users', require('./src/routes/user.routes.js'));

app.get('/', (req, res) => {
    res.send(`Servidor funcionando`);
});

app.listen(process.env.PORT, () =>{
    console.log(`Servidor funcionando en el puerto ` + process.env.PORT);
})

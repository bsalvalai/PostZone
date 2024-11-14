require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
// const cors = require('cors');

const userRoutes = require('./src/routes/user.routes.js');
const postRoutes = require('./src/routes/post.routes.js');
const sessionRoutes = require('./src/routes/session.routes.js');
const adRoutes = require('./src/routes/ad.routes.js');
const timelineRoutes = require('./src/routes/timeline.routes.js');

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

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/sessions', sessionRoutes);
app.use('/ads', adRoutes);
app.use('/timeline', timelineRoutes);


app.get('/', (req, res) => {
    res.send(`Server running`);
});

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ` + process.env.PORT);
})

import express from 'express';

const app = express(); //create an express app

app.use(express.json()); //middleware to parse JSON request bodies

import userRoutes from './routes/user.route.js';
// import postRoutes from './routes/post.route.js';

//route declaration
// app.use(express.json());
app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

//example route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

export default app;
import express from 'express';
import userRoutes from './routes/user.route.js';
import postRouter from './routes/post.route.js'
// import { getPosts } from './controllers/post.controller.js';

const app = express(); //create an express app

app.use(express.json()); //middleware to parse JSON request bodies

// import postRoutes from './routes/post.route.js';

//route declaration
// app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRouter);
// app.use('./api/get', getPosts);

//example route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

export default app;

// console.log("LOADED ROUTES:", userRoutes);

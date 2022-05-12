import express from 'express';
import routes from './routes';
import connectDB from './database/config';

const app = express();

app.use(express.json());
app.use(routes);

connectDB();

app.listen(3000, () =>{
    console.log('🛫 server started on port 3000');
});

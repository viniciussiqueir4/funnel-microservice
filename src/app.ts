import express from 'express';

const app = express();
app.use(express.json());


import modules from '~/routes';


app.use('/api/v1', modules);
export default app;
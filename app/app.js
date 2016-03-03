import express from 'express';

let app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const summaryController = require('./controllers/summaryController.js');

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/api', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/saveSummary', summaryController.saveSummary, (req, res) => {
  return res.status(200).json(req.body);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); //listens on port 3000 -> http://localhost:3000/

module.exports = app;

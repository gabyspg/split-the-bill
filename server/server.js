const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const receiptController = require('./controllers/receiptController.js');

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/api', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/getReceipts', receiptController.getReceipts, (req, res) => {
  return res.status(200).json(res.locals.found);
});

app.post('/api/saveSummary', receiptController.saveSummary, (req, res) => {
  return res.status(200).json(res.locals.summary);
});

app.put('/api/updateSummary', receiptController.updateSummary, (req, res) => {
  return res.status(200).json(res.locals.newSummary);
});

app.delete(
  '/api/deleteReceipt/:id',
  receiptController.deleteReceipt,
  (req, res) => {
    return res.status(200).json(res.locals.deleted);
  }
);

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
});

module.exports = app;

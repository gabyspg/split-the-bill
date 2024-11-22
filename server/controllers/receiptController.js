const Bill = require('../models/billModels');
const receiptController = {};

receiptController.saveSummary = async (req, res, next) => {
  try {
    const summary = new Bill(req.body);
    const savedSummary = await summary.save();
    res.locals.summary = savedSummary;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught saveSummary middleware error: ${err}`,
      status: 500,
      message: { err: 'Unable to save receipt.' },
    });
  }
};

receiptController.getReceipts = async (req, res, next) => {
  try {
    const search = req.body;
    const all = await Bill.find(search);
    res.locals.found = all;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught getReceipts middleware error: ${err}`,
      status: 500,
      message: { err: 'Unable to get receipts.' },
    });
  }
};

receiptController.updateSummary = async (req, res, next) => {
  try {
    const summary = req.body.update;
    const newSummary = await Bill.findByIdAndUpdate(req.body.id, summary, {
      new: true,
    });
    res.locals.newSummary = newSummary;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught updateSummary middleware error: ${err}`,
      status: 500,
      message: { err: 'Unable to update receipt.' },
    });
  }
};

receiptController.deleteReceipt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSummary = await Bill.findByIdAndDelete(id);
    res.locals.deleted = deletedSummary;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught deleteReceipt middleware error: ${err}`,
      status: 500,
      message: { err: 'Unable to delete receipt.' },
    });
  }
};

module.exports = receiptController;

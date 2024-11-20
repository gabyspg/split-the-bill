const Bill = require('../models/billModels');
const summaryController = {};

summaryController.saveSummary = async (req, res, next) => {
  try {
    const summary = new Bill(req.body);
    await summary.save();
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught saveSummary middleware error: ${err}`,
      status: 500,
      message: { err: 'Unable to save receipt.' },
    });
  }
};

summaryController.getReceipts = async (req, res, next) => {
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

summaryController.updateSummary = async (req, res, next) => {
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

summaryController.deleteReceipt = async (req, res, next) => {
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

module.exports = summaryController;

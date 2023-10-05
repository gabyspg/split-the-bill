const Bill = require('../models/billModels');
const summaryController = {};

summaryController.saveSummary = async (req, res, next) => {
  try {
    const summary = new Bill(req.body);
    await summary.save();
    return next();
  } catch (err) {
    return next(err);
  }
};

summaryController.getReceipts = async (req, res, next) => {
  try {
    const search = req.body;
    const all = await Bill.find(search);
    res.locals.found = all;
    return next();
  } catch (err) {
    return next(err);
  }
};

summaryController.updateSummary = async (req, res, next) => {
  try {
    const summary = req.body.update;
    console.log('summary', summary);

    const newSummary = await Bill.findByIdAndUpdate(req.body.id, summary, {
      new: true,
    });
    console.log('newSummary', newSummary);
    res.locals.newSummary = newSummary;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = summaryController;

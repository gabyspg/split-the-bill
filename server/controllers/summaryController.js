const Bill = require('../models/billModels');
const summaryController = {};

summaryController.saveSummary = async (req, res, next) => {
  try {
    console.log('in controller req.body', req.body);
    const summary = new Bill(req.body);

    console.log('summary in controller', summary);
    await summary.save();

    return next();
  } catch (err) {
    return next(err);
  }
};
module.exports = summaryController;

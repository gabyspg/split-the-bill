import React from 'react';
import { useSelector } from 'react-redux';
import calculateSummary from '../../utils/calculateSummary.js';
import SplitSummaryDisplay from '../receiptComponents/SplitSummaryDisplay.jsx';

const SplitSummary = () => {
  const { isNewSplit, isEdited } = useSelector((state) => state.history);
  const receipt = useSelector((state) => state.receipt);
  const split = useSelector((state) => state.split);

  const currentBill = isNewSplit || isEdited ? receipt : split;
  const id = !isNewSplit ? split.billSummary._id : null;

  const summary =
    isNewSplit || isEdited ? calculateSummary(currentBill) : split.billSummary;

  return (
    <SplitSummaryDisplay
      isNewSplit={isNewSplit}
      isEdited={isEdited}
      summary={summary}
      id={id}
    />
  );
};
export default SplitSummary;

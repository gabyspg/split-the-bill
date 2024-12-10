const convertSummaryToBill = (summary) => {
  const billInfo = {
    billName: summary.billName,
    restaurant: summary.restaurant,
    date: summary.date,
    tax: summary.tax,
    tip: summary.tip,
  };
  const people = [];
  const items = summary.items;
  for (let person in summary.people) {
    people.push({ name: person });
  }
  return { billInfo, people, items };
};

export default convertSummaryToBill;

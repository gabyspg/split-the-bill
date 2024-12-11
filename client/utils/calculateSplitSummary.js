const calculateSubtotal = (items) => {
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemTotal = Number(item.price) * Number(item.quantity);
    subtotal += itemTotal;
  }
  return subtotal;
};

const calculatePercent = (num, subtotal) => {
  let percent = Number(num) / subtotal;
  return percent;
};

const calculateTotal = (a, b, c) => {
  let total = Number(a) + Number(b) + Number(c);
  return total;
};

const calculateSplitSummary = (billObj) => {
  const { billInfo, people, items } = billObj;
  const subtotal = calculateSubtotal(items);
  const taxPercentage = calculatePercent(billInfo.tax, subtotal);
  const tipPercentage = calculatePercent(billInfo.tip, subtotal);
  const total = calculateTotal(subtotal, billInfo.tax, billInfo.tip);

  const summary = {
    billName: billInfo.billName,
    restaurant: billInfo.restaurant,
    date: billInfo.date,
    subtotal: subtotal,
    tax: billInfo.tax,
    taxPercentage: taxPercentage,
    tip: billInfo.tip,
    tipPercentage: tipPercentage,
    total: total,
    people: {},
    items: items,
  };

  for (let i = 0; i < people.length; i++) {
    const person = people[i].name;
    const personSummary = {
      items: [],
      subtotal: 0,
      tax: 0,
      tip: 0,
      total: 0,
    };
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      const peopleSet = new Set(item.people);
      if (!peopleSet.has(person)) {
        continue;
      }
      let quantity = Number(item.quantity / peopleSet.size);
      const itemObj = {
        itemName: item.itemName,
        price: item.price,
        quantity: Number.isInteger(quantity) ? quantity : quantity.toFixed(1),
      };

      personSummary.items.push(itemObj);
      const itemTotal =
        Number(item.price) * Number(item.quantity / peopleSet.size);
      personSummary.subtotal += itemTotal;
    }
    const personTax = Number(personSummary.subtotal * taxPercentage);
    const personTip = Number(personSummary.subtotal * tipPercentage);
    const personTotal = calculateTotal(
      personSummary.subtotal,
      personTip,
      personTax
    );
    personSummary.tip = personTip;
    personSummary.tax = personTax;
    personSummary.total = personTotal;
    summary.people[person] = personSummary;
  }
  return summary;
};

export default calculateSplitSummary;

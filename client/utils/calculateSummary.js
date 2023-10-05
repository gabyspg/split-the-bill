const calculateSubtotal = (foodItems) => {
  let subtotal = 0;
  for (let i = 0; i < foodItems.length; i++) {
    const item = foodItems[i];
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

const calculateSummary = (billObj) => {
  const { billInfo, people, foodItems } = billObj;
  const subtotal = calculateSubtotal(foodItems);
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
    foodItems: foodItems,
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
    for (let j = 0; j < foodItems.length; j++) {
      const item = foodItems[j];
      if (item.people !== person) {
        continue;
      }
      const itemObj = {
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity,
      };

      personSummary.items.push(itemObj);
      const itemTotal = Number(item.price) * Number(item.quantity);
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

export default calculateSummary;

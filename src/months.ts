export const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const expandMonths = (months: string): string[] => {
  // converts hyphenated months out to every month
  const splitMonths = months.split(",");
  let returnMonths: string[] = [];

  if (months === "All months") {
    return monthOrder;
  }
  for (let index = 0; index < splitMonths.length; index++) {
    let splitMonth = splitMonths[index];
    if (index > 0) {
      splitMonth = splitMonth.substr(1);
    }

    const start = splitMonth.substring(0, 3);
    const end = splitMonth.substring(4, 7);
    const startNumber = monthOrder.indexOf(start);
    const endNumber =
      monthOrder.indexOf(end) == -1 ? startNumber : monthOrder.indexOf(end);

    let i = startNumber;
    do {
      i = i == 12 ? 0 : i; // if i is 12, take it back to the start of the list
      returnMonths.push(monthOrder[i]);
      i++;
    } while (i != endNumber + 1);
  }
  return returnMonths;
};

export const condenseMonths = (months: string[]): string => {
  // shortens months to hyphenated version
  const firstMonth = months[0];
  const lastMonth = months[months.length - 1];
  return firstMonth + "-" + lastMonth;
};

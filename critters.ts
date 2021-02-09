import fs from 'fs';
import data from './critters.json';

const expandMonths = (months: string): string[] => {
  // converts hyphenated months out to every month
  console.log(months);
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const splitMonths = months.split(",");
  let returnMonths: string[] = [];
  
  for (let index = 0; index < splitMonths.length; index++) {
    let splitMonth = splitMonths[index];
    if (index > 0) {
      splitMonth = splitMonth.substr(1);
    }

    const start = splitMonth.substring(0, 3);
    const end = splitMonth.substring(4, 7);
    const startNumber = monthOrder.indexOf(start);
    const endNumber = monthOrder.indexOf(end) == -1 ? startNumber : monthOrder.indexOf(end);
    
    let i = startNumber;
    do {
      i = i == 12 ? 0 : i; // if i is 12, take it back to the start of the list
      returnMonths.push(monthOrder[i]);
      i++;
    } while (i != endNumber + 1);
  }
  return returnMonths;
}

const condenseMonths = (months: string[]): string => {
  // shortens months to hyphenated version
  const firstMonth = months[0];
  const lastMonth = months[months.length - 1];
  return firstMonth + "-" + lastMonth;
}

function main() {
  // const stringData = JSON.stringify(data);
  const stringData = JSON.stringify({"hi": "hi"});

  fs.writeFile('./lame.json', stringData, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
  console.log(data.critters.length);
  console.log(data.critters[0]);
}

main();

import fs from "fs";
import Critter from "./types";
import * as months from "./months";
import data from "./critters.json";

function getData(): Critter[] {
  return data.critters;
}

function writeData(critters: Critter[]): void {
  const stringData = JSON.stringify({critters: critters});
  fs.writeFile("./critters.json", stringData, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data has been saved.");
  });
}

function getChoice(): number {
  /**
   * 1. update what has been caught
   * 2. show how many critters you have caught
   * 3. show what is needed to catch a particular month
   * -> add * if it is not available next month
   */

  let result: number = -1;

  while (result === -1) {
    const prompt = require("prompt-sync")();
    console.log("What would you like to do?");
    console.log("1. Update what you have caught.");
    console.log("2. See how many critters you have caught.");
    console.log("3. See what critters are available to catch this month.");
    console.log("0. Exit.");
    const choice = prompt("Enter (0-3) ");

    result = Number.parseInt(choice);
    if (isNaN(result) || result < -1 || result > 3) {
      result = -1;
      console.log("Please enter a correct value.");
    }
  }

  return result;
}

function updateCaughtCritters(critters: Critter[]): void {
  /**
   * This is real brute force, a good way to list off all of your
   *   captures from the start
   */
  for (let i = 0; i < critters.length; i++) {
    let critter = critters[i];

    if (critter.status === "Not Caught") {
      let result: string = ".";
      while (result === ".") {
        const prompt = require("prompt-sync")();
        console.log(`\nHave you caught ${critter.name}?`);
        result = prompt("Enter (Y/N) ");
        if (
          !(
            result === "Y" ||
            result === "y" ||
            result === "N" ||
            result === "n"
          )
        ) {
          result = ".";
        }
      }
      if (result === "Y" || result === "y") {
        critter.status = "Caught";
      }
    }
  }
}

function showCritterCount(critters: Critter[]): void {
  let count = 0;
  for (let i = 0; i < critters.length; i++) {
    const critter = critters[i];
    if (critter.status === "Caught") {
      count++;
    }
  }
  console.log(`\nYou have caught ${count} out of ${critters.length} critters!`);
}

function showCrittersByMonth(critters: Critter[]): void {
  let month: string = "___";

  while (month === "___") {
    const prompt = require("prompt-sync")();
    console.log(
      "\nWhich month would you like to see which critters you need to catch?"
    );
    month = prompt("Please enter month in three letter format (e.g. Jan) ");
    month = month.charAt(0).toUpperCase() + month.substring(1);

    if (!months.monthOrder.includes(month)) {
      month = "___";
      console.log("Please enter a correct month.");
    }
  }

  const monthIndex = months.monthOrder.indexOf(month);
  const nextMonth = months.monthOrder[monthIndex == 11 ? 0 : monthIndex + 1];

  console.log(`\nList of Critters that are available in ${month}`);
  console.log('If there is a "*", that means it is not available next month.');
  for (let i = 0; i < critters.length; i++) {
    const critter = critters[i];
    const availableMonths = months.expandMonths(critter.months);
    if (critter.status === "Not Caught" && availableMonths.includes(month)) {
      const lastMonthAvailable = !availableMonths.includes(nextMonth);
      if (lastMonthAvailable) {
        console.log("********************");
      }
      console.log(critter);
      if (lastMonthAvailable) {
        console.log("********************");
      }
    }
  }
}

function main() {
  const critters = getData();
  const result = getChoice();
  if (result === 1) {
    updateCaughtCritters(critters);
    writeData(critters);
  } else if (result === 2) {
    showCritterCount(critters);
  } else if (result === 3) {
    showCrittersByMonth(critters);
  }
}

main();

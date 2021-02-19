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

  let result: number = -1;

  while (result === -1) {
    const prompt = require("prompt-sync")();
    console.log("\nWhat would you like to do?");
    console.log("1. Go through each critter.");
    console.log("2. Enter critter to update.");
    console.log("0. Exit.");
    const choice = prompt("Enter (0-2) ");

    result = Number.parseInt(choice);
    if (isNaN(result) || result < -1 || result > 2) {
      result = -1;
      console.log("Please enter a correct value.");
    }
  }

  if (result === 1) {
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
  } else if (result === 2) {
    let choice: string = "";
    let found: boolean = false;

    let critter: Critter;
    while (choice !== "0") {
      const prompt = require("prompt-sync")();
      console.log(
        "Enter the critter you want to update to caught (0 to exit)."
      );
      const choice = prompt("  ");

      for (let i = 0; i < critters.length; i++) {
        critter = critters[i];
        if (critter.name.toLowerCase() === choice.toLowerCase()) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }

    if (critter.status === "Not Caught") {
      let result: string = ".";
      while (result === ".") {
        const prompt = require("prompt-sync")();
        console.log("Update status to caught?");
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
  const count = {
    count: 0,
    Insect: 0,
    Fish: 0,
    "Sea Creature": 0
  };
  const critterTotal = {
    Insect: 0,
    Fish: 0,
    "Sea Creature": 0
  };
  for (let i = 0; i < critters.length; i++) {
    const critter = critters[i];
    critterTotal[critter.type]++;
    if (critter.status === "Caught") {
      count.count++;
      count[critter.type]++;
    }
  }
  console.log(
    `\nYou have caught ${count.Insect} out of ${critterTotal.Insect} insects!`
  );
  console.log(
    `You have caught ${count.Fish} out of ${critterTotal.Fish} fish!`
  );
  console.log(
    `You have caught ${count["Sea Creature"]} out of ${critterTotal["Sea Creature"]} sea creatures!`
  );
  console.log(
    `You have caught ${count.count} out of ${critters.length} critters!`
  );
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

  let result: number = -1;
  while (result === -1) {
    const prompt = require("prompt-sync")();
    console.log("\nWhich critters would you like to see?");
    console.log("1. Insects");
    console.log("2. Fish");
    console.log("3. Sea Creatures");
    console.log("0. All.");
    const choice = prompt("Enter (0-3) ");

    result = Number.parseInt(choice);
    if (isNaN(result) || result < -1 || result > 3) {
      result = -1;
      console.log("Please enter a correct value.");
    }
  }

  let critterTypes: string[];
  switch (result) {
    case 1:
      critterTypes = ["Insect"];
      break;
    case 2:
      critterTypes = ["Fish"];
      break;
    case 3:
      critterTypes = ["Sea Creature"];
      break;
    default:
      critterTypes = ["Insect", "Fish", "Sea Creature"];
  }

  const monthIndex = months.monthOrder.indexOf(month);
  const nextMonth = months.monthOrder[monthIndex == 11 ? 0 : monthIndex + 1];

  console.log(`\nList of Critters that are available in ${month}`);
  console.log('If there is a "*", that means it is not available next month.');
  for (let i = 0; i < critters.length; i++) {
    const critter = critters[i];
    const availableMonths = months.expandMonths(critter.months);
    if (critter.status === "Not Caught" && availableMonths.includes(month)) {
      if (critterTypes.includes(critter.type)) {
        const lastMonthAvailable = !availableMonths.includes(nextMonth);
        if (lastMonthAvailable) {
          console.log("********************");
        }
        console.log(critter);
        console.log("\n");
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

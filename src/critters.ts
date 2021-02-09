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
   * 2. show what is needed to catch a particular month
   * -> add * if it is not available next month
   */

  let result: number = -1;

  while (result === -1) {
    const prompt = require("prompt-sync")();

    console.log("What would you like to do?");
    console.log("1. Update what you have caught.");
    console.log("2. See what critters are available to catch this month.");
    console.log("0. Exit.");
    const choice = prompt("Enter (0-2) ");

    result = Number.parseInt(choice);
    if (isNaN(result) || result < -1 || result > 2) {
      result = -1;
      console.log("Please enter a correct value.");
    }
  }

  return result;
}

function updateCaughtCritters(critters: Critter[]): void {}

function showCrittersByMonth(critters: Critter[]): void {}

function main() {
  const critters = getData();
  const result = getChoice();
  if (result === 1) {
    updateCaughtCritters(critters);
  } else if (result === 2) {
    showCrittersByMonth(critters);
  }
  // writeData(critters);
}

main();

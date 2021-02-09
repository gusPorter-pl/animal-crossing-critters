import fs from 'fs';
import Critter from './types';
import * as months from './months';
import data from './critters.json';

function getData(): Critter[] {
  return data.critters;
}

function writeData(critters: Critter[]): void {
  const stringData = JSON.stringify({critters: critters});
  fs.writeFile('./critters.json', stringData, (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data has been saved.');
  });
}

function main() {
  const critters = getData();

  writeData(critters);
}

main();

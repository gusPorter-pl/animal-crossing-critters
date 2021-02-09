import fs from 'fs';
import * as months from './months';
import data from './critters.json';

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

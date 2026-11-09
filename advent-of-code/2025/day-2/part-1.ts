import fs from "node:fs";
import path from "node:path";

const filePath = path.join(import.meta.dirname, "input.txt");
const file = fs.readFileSync(filePath, "utf-8");
const input = file.split(",");

// const input = [
//   "11-22",
//   "95-115",
//   "998-1012",
//   "1188511880-1188511890",
//   "222220-222224",
//   "1698522-1698528",
//   "446443-446449",
//   "38593856-38593862",
//   "565653-565659",
//   "824824821-824824827",
//   "2121212118-2121212124",
// ];

const invalidIDs = [];

for (let i = 0; i < input.length; i++) {
  const range = input[i];
  const [firstID, lastID] = range.split("-");

  const from = Number.parseInt(firstID);
  const to = Number.parseInt(lastID);

  for (let number = from; number <= to; number++) {
    const str = number.toString();
    const len = str.length;

    if (len % 2 !== 0) {
      continue;
    }

    const firstHalf = str.substring(0, len / 2);
    const lastHalf = str.substring(len / 2, len);

    if (firstHalf === lastHalf) {
      invalidIDs.push(number);
    }
  }
}

const sum = invalidIDs.reduce((total, current) => total + current, 0);

console.log("The invalid IDs are:", ...invalidIDs);
console.log("The sum of the invalid IDs is:", sum);

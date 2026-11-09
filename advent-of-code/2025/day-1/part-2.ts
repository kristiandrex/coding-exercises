import fs from "node:fs";
import path from "node:path";

const filePath = path.join(import.meta.dirname, "input.txt");
const file = fs.readFileSync(filePath, "utf-8");
const input = file.split("\n");

// const input = [
//   "L68",
//   "L30",
//   "R48",
//   "L5",
//   "R60",
//   "L55",
//   "L1",
//   "L99",
//   "R14",
//   "L82",
// ]

let clicksAtZero = 0;
let currentPosition = 50;

const MIN = 0;
// the max number of the dial is 99 but use 100 to simplify the math
const MAX = 100;

for (let i = 0; i < input.length; i++) {
  const rotation = input[i];

  if (!rotation) {
    continue;
  }

  const direction = rotation[0];
  // Ignore full dial rotations using modulo 100
  const distance = Number.parseInt(rotation.slice(1));
  const turns = Math.floor(distance / MAX);
  const distanceNoTurns = distance % MAX;

  let nextPosition =
    direction === "L"
      ? currentPosition - distanceNoTurns
      : currentPosition + distanceNoTurns;

  // is out of range
  if (nextPosition < MIN || nextPosition >= MAX) {
    nextPosition =
      direction === "L" ? MAX - Math.abs(nextPosition) : nextPosition - MAX;

    // When the dial passes zero during rotation
    if (currentPosition !== 0 && nextPosition !== 0) {
      clicksAtZero++;
    }
  }

  currentPosition = nextPosition;

  if (currentPosition === 0) {
    clicksAtZero++;
  }

  clicksAtZero += turns;
}

console.log("The final position is", currentPosition);
console.log("The password is:", clicksAtZero);

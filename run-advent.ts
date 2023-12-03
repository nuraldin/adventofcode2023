import { solution as advent1 } from "./advent-1";
import { solution as advent2 } from "./advent-2";
import { solution as advent3 } from "./advent-3";
import { solution as advent4 } from "./advent-4";
import { solution as advent5 } from "./advent-5";
import { solution as advent6 } from "./advent-6";

const options = [
  advent1,
  advent2,
  advent3,
  advent4,
  advent5,
  advent6
]

const run = () => {
  const option = Number(process.argv[2]) - 1;
  const result = options[option]();
  console.log({ result })
}

run()

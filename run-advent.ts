import { solution as advent1 } from './src/advent-1'
import { solution as advent2 } from './src/advent-2'
import { solution as advent3 } from './src/advent-3'
import { solution as advent4 } from './src/advent-4'
import { solution as advent5 } from './src/advent-5'
import { solution as advent6 } from './src/advent-6'

const options = [
  advent1,
  advent2,
  advent3,
  advent4,
  advent5,
  advent6
]

const run = () => {
  const option = Number(process.argv[2]) - 1
  const result = options[option]()
  console.log({ result })
}

run()
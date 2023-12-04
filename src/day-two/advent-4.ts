const getCubesPower = (games: Record<string, number>[][][]) => {
  let result = 0

  for (let idx = 0; idx < games.length; idx++) {
    const game = games[idx]

    const minimums: Record<string, number> = {
      red: 0,
      blue: 0,
      green: 0
    }

    game.forEach(gameRound => gameRound.forEach(round => {
      Object.keys(round).forEach(rk => {
        if (round[rk] > minimums[rk]) {
          minimums[rk] = round[rk]
        }
      })
    }))

    const power = Object.values(minimums).reduce((acum, minimum) => acum * minimum, 1)
    result += power
  }

  return result
}

const parseGames = (input: string) => {
  const gameLogEntries = input.split('\n').map(gameLogEntry => gameLogEntry.split(':')[1]) // get each line of game

  const gameEntryRoundsResults = gameLogEntries.map(
    gameLogEntry => gameLogEntry.split(';').map(
      gameRound => gameRound.trim()
    )
  ) // divide each round, separated by ;

  const gameRoundDices = gameEntryRoundsResults.map(
    gameEntryRoundsResult => gameEntryRoundsResult.map(
      gameEntryRounds => gameEntryRounds.split(',').map(gameEntryRound => gameEntryRound.trim()).map(
        gameEntryRound => {
          const [amount, color] = gameEntryRound.split(' ')

          const hash: Record<string, number> = {}
          hash[color] = Number(amount)

          return hash
        }
      )
    )
  )

  // console.log(JSON.stringify(gameRoundDices))

  return gameRoundDices
}

export const solution = (input: string): number => {
  const games = parseGames(input)
  return getCubesPower(games)
}
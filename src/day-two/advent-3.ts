const possibleValues: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14
}

const getCubesPower = (games: Record<string, number>[][][]) => {
  let result = 0

  for (let idx = 0; idx < games.length; idx++) {
    const game = games[idx]

    const valid = game.every(gameRound => gameRound.every(round => Object.keys(round).every(rk => round[rk] <= possibleValues[rk])))

    console.log({ idx, game: JSON.stringify(game), valid })

    result += valid ? idx + 1 : 0
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

          const hash: Record<string,number> = {}
          hash[color] = Number(amount)

          return hash
        }
      )
    )
  )

  return gameRoundDices
}

export const solution = (input: string): number => {
  const games = parseGames(input)
  return getCubesPower(games)
}

const parseInput = (input: string): string[][] => {
  const lines = input.split("\n");

  const handAndBids = lines.reduce<string[][]>((acum, line) => {
    acum.push(line.split(' '))
    return acum;
  } , []);

  return handAndBids;
}

const cardStrengths = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

/**
 * rank values
 * 0 - high card
 * 1 - one pair
 * 2 - two pair
 * 3 - three of a kind
 * 4 - full house
 * 5 - four of a kind 
 * 6 - five of a kind
 */
const jokerRank = (cardsMap: Record<string, number>): number => {
  let rank: number = 0;

  switch(Object.entries(cardsMap).length) {
    case 5: // all different, but one joker. best hand: one pair
      rank = 1;
      break;
    case 4: // one is repeated, either way is a three of a kind, as the there can be two or one joker, if one joker another one is repeated, if two jokers it can be a trio any card.
      rank = 3;
      break;
    case 3: // one or two must be repeated, two options full house or four of a kind
      rank = cardsMap['J'] >= 2 ? 5 : Object.values(cardsMap).some(v => v === 2) ? 4 : 5;
      break;
    case 2: // only two cards, is jokers and others of the same, five of a kind
      rank = 6;
      break;
    case 1: // all the same card, five of a kind
      rank = 6;
      break;
  }

  return rank;
}

/**
 * rank values
 * 0 - high card
 * 1 - one pair
 * 2 - two pair
 * 3 - three of a kind
 * 4 - full house
 * 5 - four of a kind 
 * 6 - five of a kind
 */
const simpleRank = (cardsMap: Record<string, number>): number => {
  let rank: number = 0;

  switch(Object.entries(cardsMap).length) {
    case 5: // all different, high card
      rank = 0;
      break;
    case 4: // one is repeated, one pair.
      rank = 1;
      break;
    case 3: // one or two must be repeated, can be two pair or three of a kind
      rank = Object.values(cardsMap).includes(3) ? 3 : 2;
      break;
    case 2: // only two cards - full house or four of a kind
      rank = Object.values(cardsMap).includes(4) ? 5 : 4;
      break;
    case 1: // all the same card, five of a kind
      rank = 6;
      break;
  }

  return rank;
}

const getRank = (hand: string): number => {
  let cardsMap: Record<string, number> = {};
  for(const card of hand) {
    cardsMap[card] = !cardsMap[card] ? 1 : cardsMap[card] + 1;
  }
  console.log({cardsMap})

  return cardsMap['J'] ? jokerRank(cardsMap) : simpleRank(cardsMap);
}

const getTotalWinnings = (handAndBids: string[][]) => {
  let results: [string, string, number][] = [];
  handAndBids.forEach(([hand, bid]) => {
    const rank = getRank(hand);
    results.push([hand, bid, rank])
  });
  results.sort(([firstCard, firstBid, firstRank], [secondCard, secondBid, secondRank]) => { 
    if ( firstRank === secondRank ) {
      let idx = 0;
      while( cardStrengths.indexOf(firstCard[idx]) === cardStrengths.indexOf(secondCard[idx]) && idx < firstCard.length ) {
        idx++;
      }
      return cardStrengths.indexOf(firstCard[idx]) - cardStrengths.indexOf(secondCard[idx]);
    }
    return firstRank - secondRank;
  })
  console.log({ results })
  return results.reduce((acum, result, index) => acum + Number(result[1]) * (index + 1), 0);
}

export const solution = (input: string): number => {
  const parsedInput = parseInput(input);
  return getTotalWinnings(parsedInput);
}

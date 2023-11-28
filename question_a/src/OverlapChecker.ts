export function isOverlapping(first: Line, second: Line) {
  let comparedFirst = first;
  if (first.start > first.finish) {
    comparedFirst = { ...first };
    comparedFirst.finish = first.start
    comparedFirst.start = first.finish
  }

  let comparedSecond = second;
  if (second.start > second.finish) {
    comparedSecond = { ...second };
    comparedSecond.finish = second.start
    comparedSecond.start = second.finish
  }

  if (comparedSecond.finish < comparedFirst.start) {
    return false
  }

  if (comparedSecond.start > comparedFirst.finish) {
    return false
  }

  return true
}

interface Line {
  start: number
  finish: number
}
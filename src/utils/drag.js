export const drag = Drag()

function Drag() {
  let startingCoord;
  let currentSelector;

  const start = (coord, selector) => {
    startingCoord = coord
    currentSelector = selector
    mouseGrab(currentSelector, "grabbing")
  }

  const end = (endingCoord) => {
    mouseGrab(currentSelector, "grab")
    if (startingCoord === endingCoord) return
    if (startingCoord > endingCoord) return 'left'
    if (startingCoord < endingCoord) return 'right'
  }

  return {
    start,
    end,
  }
}
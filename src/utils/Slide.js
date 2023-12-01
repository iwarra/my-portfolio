export const slide = (data, arrow) => {
  let shifted;
  if (arrow === "left") shifted = [...data.slice(1), data.at(0)]
  if (arrow === "right") shifted = [data.at(-1), ...data.slice(0, -1)]
  return shifted ?? data
};

let startingCoord;

export const dragStart = (start) => {
  startingCoord = start.clientX
  document.querySelector(".projects-list").style.cursor = 'grabbing'
};

export const dragEnd = (data, end) => {
  document.querySelector(".projects-list").style.cursor = 'grab'

  if (startingCoord === end.clientX) {
    return data
  }

  if (startingCoord > end.clientX) {
    return slide(data, 'left')
  }

  if (startingCoord < end.clientX) {
    return slide(data, 'right')
  }
};
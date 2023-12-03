export const mouseGrab = (selector, action) => {
  return document.querySelector(`.${selector}`).style.cursor = action
}
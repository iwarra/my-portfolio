export const slide = (data, direction) => {
  if (!Array.isArray(data) || !direction) return data

  let shifted;
  if (direction === "left") shifted = [...data.slice(1), data.at(0)]
  if (direction === "right") shifted = [data.at(-1), ...data.slice(0, -1)]
  return shifted
};
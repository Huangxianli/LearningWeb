function getRandNum (min = 0, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandNum };
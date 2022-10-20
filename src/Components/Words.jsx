var colors = [
  "red",
  "blue",
  "darkblue",
  "brown",
  "black",
  "pale",
  "peach",
  "white",
  "wine",
  "skyblue",
  "orange",
  "marine",
  "grey",
  "cream",
  "gold",
  "cyan",
];

function randomWords() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export { randomWords };

let data = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

data = await Deno.readTextFile("4.txt");

let grid = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let nextChar = {
  X: "M",
  XM: "A",
  XMA: "S",
};

let res = 0;

function inBounds(row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

function dfs(row, col, cur, x, y) {
  if (cur === "XMAS") {
    res++;
    return;
  }

  let rx = row + x;
  let cy = col + y;

  if (!inBounds(rx, cy)) return;
  let ch = grid[rx][cy];

  if (ch === "#") return;
  if (nextChar[cur] !== ch) return;

  grid[ch] = "#";
  dfs(rx, cy, cur + ch, x, y);
  grid[ch] = ch;
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === "X") {
      for (let [x, y] of [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
      ]) {
        dfs(row, col, "X", x, y);
      }
    }
  }
}

console.log(res);

let data = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

data = await Deno.readTextFile("6.txt");

let grid = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let srow = 0;
let scol = 0;
let H = data.length;
let W = data[0];

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === "^") {
      srow = row;
      scol = col;
      grid[srow][scol] = ".";
      break;
    }
  }
}

function inBounds(row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let res = 0;

function key(row, col, dir) {
  return `${row}|${col}|${dir}`;
}

let candidates = [];
function dfsCandidates(row, col, dir) {
  let key = (r, c) => `${r}|${c}`;
  let visited = new Set();
  while (true) {
    let k = key(row, col);
    if (grid[row][col] === "." && !visited.has(k)) {
      visited.add(k);
      candidates.push([row, col]);
    }

    let [x, y] = dirs[dir];
    let xrow = row + x;
    let ycol = col + y;

    if (!inBounds(xrow, ycol)) {
      return;
    }

    if (grid[xrow][ycol] === "#") {
      dir = (dir + 1) % 4;
      continue;
    }

    row = xrow;
    col = ycol;
  }
}

dfsCandidates(srow, scol, 0);

function dfs(row, col, dir) {
  let visited = new Set();
  while (true) {
    let kk = key(row, col, dir);
    if (visited.has(kk)) {
      return true;
    }

    if (grid[row][col] === ".") {
      visited.add(kk);
    }

    let [x, y] = dirs[dir];
    let xrow = row + x;
    let ycol = col + y;

    if (!inBounds(xrow, ycol)) {
      return false;
    }

    if (grid[xrow][ycol] === "#") {
      dir = (dir + 1) % 4;
      continue;
    }

    row = xrow;
    col = ycol;
  }
}

for (let [row, col] of candidates) {
  grid[row][col] = "#";
  if (dfs(srow, scol, 0)) {
    res += 1;
  }
  grid[row][col] = ".";
}

console.log(res);

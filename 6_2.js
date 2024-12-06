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

let dirMap = {
  up: [-1, 0],
  left: [0, -1],
  down: [1, 0],
  right: [0, 1],
};

let nextDir = {
  up: "right",
  left: "up",
  down: "left",
  right: "down",
};

let res = 0;

function key(row, col, dir) {
  return `${row}|${col}|${dir}`;
}

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

    let [x, y] = dirMap[dir];
    let xrow = row + x;
    let ycol = col + y;

    if (!inBounds(xrow, ycol)) {
      return false;
    }

    if (grid[xrow][ycol] === "#") {
      dir = nextDir[dir];
      continue;
    }

    row = xrow;
    col = ycol;
  }
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] !== ".") {
      continue;
    }

    grid[row][col] = "#";
    if (dfs(srow, scol, "up")) {
      res += 1;
    }
    grid[row][col] = ".";
  }
}

console.log(res);
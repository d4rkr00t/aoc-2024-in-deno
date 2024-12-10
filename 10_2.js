let data = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

data = Deno.readTextFileSync("10.txt").trim();

let grid = data.split("\n").map((line) => line.trim().split("").map(Number));

let starts = [];

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === 0) {
      starts.push([row, col]);
    }
  }
}

let res = 0;

for (let [row, col] of starts) {
  bfs(row, col);
}

function bfs(row, col) {
  let queue = [[row, col]];
  let total = 0;

  while (queue.length) {
    let [r, c] = queue.shift();
    if (grid[r][c] === 9) {
      total++;
      continue;
    }

    for (let [x, y] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      let rx = r + x;
      let cy = c + y;
      if (!inBounds(rx, cy)) {
        continue;
      }

      if (grid[rx][cy] - grid[r][c] !== 1) {
        continue;
      }

      queue.push([rx, cy]);
    }
  }

  res += total;
}

function inBounds(row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

console.log(res);

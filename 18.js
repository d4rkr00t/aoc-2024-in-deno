let data = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

let W = 6;
let H = 6;
let L = 12;

data = Deno.readTextFileSync("18.txt");
W = 70;
H = 70;
L = 1024;

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(",").map(Number));

let grid = Array.from({ length: W + 1 }, () =>
  Array.from({ length: H + 1 }, () => "."),
);

let visited = Array.from({ length: W + 1 }, () =>
  Array.from({ length: H + 1 }, () => Infinity),
);

function simulate() {
  for (let i = 0; i < L; i++) {
    let [col, row] = data[i];
    grid[row][col] = "#";
  }
}

function inBounds(row, col) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

function dist(row, col) {
  return Math.ceil(Math.sqrt((H - row) ** 2 + (W - col) ** 2));
}

function bfs() {
  let queue = [[0, 0, 0, dist(0, 0)]];
  visited[0][0] = 0;

  while (queue.length) {
    let [row, col, steps] = queue.shift();
    if (row === H && col === W) {
      return steps;
    }

    visited[row][col] = Math.min(steps, visited[row][col]);

    for (let [x, y] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      let rx = row + x;
      let cy = col + y;
      if (!inBounds(rx, cy) || visited[rx][cy] <= steps) {
        continue;
      }
      if (grid[rx][cy] === "#") {
        continue;
      }
      queue.push([rx, cy, steps + 1, dist(rx, cy)]);
    }

    queue.sort((a, b) => {
      if (a[3] === b[3]) {
        return a[2] - b[2];
      }
      return a[3] - b[3];
    });
  }

  return -1;
}

simulate();
console.log(bfs());

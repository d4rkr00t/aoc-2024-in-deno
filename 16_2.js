let data = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

data = `
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

data = Deno.readTextFileSync("16.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let cache = Array.from({ length: data.length }, () => {
  return Array.from({ length: data[0].length }, () => {
    return Array.from({ length: 4 }, () => Infinity);
  });
});

let cache3 = Array.from({ length: data.length }, () => {
  return Array.from({ length: data[0].length }, () => {
    return Array.from({ length: 4 }, () => Infinity);
  });
});

let cache2 = Array.from({ length: data.length }, () => {
  return Array.from({ length: data[0].length }, () => Infinity);
});

let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let dir = 1;

let start = null;
let end = null;

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data.length; col++) {
    if (data[row][col] === "S") {
      start = [row, col];
    }
    if (data[row][col] === "E") {
      end = [row, col];
    }
  }
}

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[0].length;
}

function getValue(row, col) {
  return inBounds(row, col) ? data[row][col] : false;
}

function hash(row, col) {
  return `${row}|${col}`;
}

function bfs(row, col, dir) {
  let queue = [[row, col, dir, 0]];
  let min = Infinity;

  while (queue.length) {
    let [row, col, dir, cost] = queue.shift();

    if (getValue(row, col) === "E") {
      min = Math.min(min, cost);
      continue;
    }

    if (cache[row][col][dir] <= cost) {
      continue;
    }

    cache[row][col][dir] = cost;

    let nextPos = [row + dirs[dir][0], col + dirs[dir][1]];
    if (getValue(...nextPos) === "." || getValue(...nextPos) === "E") {
      if (cache[nextPos[0]][nextPos[1]][dir] > cost + 1) {
        queue.push([...nextPos, dir, cost + 1]);
      }
    }

    // turn left
    let nextDir = dir - 1 < 0 ? 3 : dir - 1;
    queue.push([row, col, nextDir, cost + 1000]);

    // turn right
    nextDir = (dir + 1) % 4;
    queue.push([row, col, nextDir, cost + 1000]);
  }

  return min;
}

let min = bfs(...start, dir);
console.log(min);

let paths = new Set();
function dfs(row, col, dir, cost) {
  if (cost > min) {
    return false;
  }

  if (getValue(row, col) === "E") {
    if (cost === min) {
      paths.add(hash(row, col));
      return true;
    }
    return false;
  }

  if (cache3[row][col][dir] < cost) {
    return false;
  }

  cache3[row][col][dir] = cost;

  let reachedMin = false;
  let nextPos = [row + dirs[dir][0], col + dirs[dir][1]];
  if (getValue(...nextPos) && getValue(...nextPos) !== "#") {
    if (dfs(...nextPos, dir, cost + 1)) {
      paths.add(hash(row, col));
      reachedMin = true;
    }
  }

  let nextDir = dir - 1 < 0 ? 3 : dir - 1;
  nextPos = [row + dirs[nextDir][0], col + dirs[nextDir][1]];
  if (getValue(...nextPos) && getValue(...nextPos) !== "#") {
    if (dfs(...nextPos, nextDir, cost + 1001)) {
      paths.add(hash(row, col));
      reachedMin = true;
    }
  }

  nextDir = (dir + 1) % 4;
  nextPos = [row + dirs[nextDir][0], col + dirs[nextDir][1]];
  if (getValue(...nextPos) && getValue(...nextPos) !== "#") {
    if (dfs(...nextPos, nextDir, cost + 1001)) {
      paths.add(hash(row, col));
      reachedMin = true;
    }
  }

  return reachedMin;
}

dfs(...start, dir, 0);

console.log(paths.size);

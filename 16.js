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

let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let dir = 1;

let start = null;

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data.length; col++) {
    if (data[row][col] === "S") {
      start = [row, col];
    }
  }
}

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[0].length;
}

function getValue(row, col) {
  return inBounds(row, col) ? data[row][col] : false;
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

console.log(bfs(...start, dir));

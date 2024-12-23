let data = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

data = Deno.readTextFileSync("20.txt");

data = data
  .trim()
  .split("\n")
  .map((item) => item.trim());

let start = [];
let end = [];

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[0].length; col++) {
    if (data[row][col] === "S") {
      start = [row, col];
    }
    if (data[row][col] === "E") {
      end = [row, col];
    }
  }
}

function dist(row, col) {
  return Math.ceil(Math.sqrt((end[0] - row) ** 2 + (end[1] - col) ** 2));
}

function key(r, c) {
  return `${r}|${c}`;
}

function key2(r, c, j) {
  return `${r}|${c}|${j}`;
}

function shortest(rs, cs, re, ce) {
  let queue = [[rs, cs, 0]];
  let visited = new Set([key(rs, cs)]);
  while (queue.length) {
    let [r, c, d] = queue.shift();
    if (r === re && c === ce) {
      return d;
    }

    for (let [x, y] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      let rx = r + x;
      let cy = c + y;

      if (!data[rx]?.[cy] || data[rx][cy] === "#" || visited.has(key(rx, cy))) {
        continue;
      }

      queue.push([rx, cy, d + 1]);
      visited.add(key(rx, cy));
    }
  }
  return -1;
}

let cache = {};

function bfs() {
  let queue = [[...end, 0]];
  let visited = new Set([key(...end)]);

  while (queue.length) {
    let [row, col, steps] = queue.shift();
    cache[key(row, col)] = steps;

    for (let [x, y] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      let rx = row + x;
      let cy = col + y;

      if (!data[rx]?.[cy] || data[rx][cy] === "#" || visited.has(key(rx, cy))) {
        continue;
      }

      queue.push([rx, cy, steps + 1]);
      visited.add(key(rx, cy));
    }
  }
}

function find(shortestDist) {
  let queue = [[...start, 0]];
  let res = {};
  let visited = new Set([key(...start)]);
  while (queue.length) {
    let [r, c, d] = queue.shift();
    if (r === end[0] && c === end[1]) {
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

      if (!data[rx]?.[cy]) {
        continue;
      }

      // can jump
      if (
        data[rx][cy] === "#" &&
        data[rx + x]?.[cy + y] &&
        data[rx + x][cy + y] !== "#"
      ) {
        let steps = cache[key(rx + x, cy + y)] + d + 2;
        let diff = shortestDist - steps;
        if (diff > 0) {
          let kk = `${key(r, c)}|${key(rx + x, cy + y)}`;
          res[kk] = diff;
        }

        continue;
      }

      if (!visited.has(key(rx, cy)) && data[rx][cy] !== "#") {
        visited.add(key(rx, cy));
        queue.push([rx, cy, d + 1]);
      }
    }
  }
  return res;
}

let shortestDist = shortest(...start, ...end);
bfs(shortestDist);

let res = find(shortestDist);

let total = 0;
for (let val of Object.values(res)) {
  if (val >= 100) {
    total += 1;
  }
}

console.log(total);

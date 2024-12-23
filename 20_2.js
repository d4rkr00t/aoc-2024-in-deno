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
let limit = 50;

data = Deno.readTextFileSync("20.txt");
limit = 100;

data = data
  .trim()
  .split("\n")
  .map((item) => item.trim().split(""));

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

function key(r, c) {
  return `${r}|${c}`;
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
  let res = [];
  let queue = [[...start, 0]];
  let visited = new Set([key(...start)]);

  while (queue.length) {
    let [row, col, steps] = queue.shift();
    if (shortestDist - steps <= limit) continue;
    res.push([row, col, steps]);

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

  return res;
}

let shortestDist = shortest(...start, ...end);
bfs(shortestDist);

let starts = find(shortestDist);

let res = {};

function findShortcuts(row, col, steps) {
  let queue = [[row, col, 0, key(row, col)]];
  let visited = new Set([key(row, col)]);

  while (queue.length) {
    let [r, c, s, p] = queue.shift();

    if (s > 19) continue;

    for (let [x, y] of [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]) {
      let rx = r + x;
      let cy = c + y;

      if (!data[rx]?.[cy] || visited.has(key(rx, cy))) {
        continue;
      }

      if (data[rx][cy] !== "#") {
        let kk = `${key(row, col)}|${key(rx, cy)}`;
        let diff = shortestDist - (s + steps + cache[key(rx, cy)] + 1);
        if (diff > 0) {
          res[kk] = Math.max(res[kk] ?? -Infinity, diff);
        }
      }

      queue.push([rx, cy, s + 1, p + " > " + key(rx, cy)]);
      visited.add(key(rx, cy));
    }
  }
}

for (let start of starts) {
  findShortcuts(start[0], start[1], start[2]);
}

let total = 0;
for (let val of Object.values(res)) {
  if (val >= limit) {
    total += 1;
  }
}

console.log(total);

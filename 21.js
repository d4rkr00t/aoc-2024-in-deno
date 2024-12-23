let data = [
  ["029A", 29],
  ["980A", 980],
  ["179A", 179],
  ["456A", 456],
  ["379A", 379],
];

data = [
  ["341A", 341],
  ["480A", 480],
  ["286A", 286],
  ["579A", 579],
  ["149A", 149],
];

let num = {
  A: { 3: "^", 0: "<" },
  0: { A: ">", 2: "^" },
  1: { 2: ">", 4: "^" },
  2: { 5: "^", 3: ">", 0: "v", 1: "<" },
  3: { 6: "^", A: "v", 2: "<" },
  4: { 5: ">", 7: "^", 1: "v" },
  5: { 8: "^", 6: ">", 2: "v", 4: "<" },
  6: { 9: "^", 5: "<", 3: "v" },
  7: { 8: ">", 4: "v" },
  8: { 9: ">", 5: "v", 7: "<" },
  9: { 8: "<", 6: "v" },
};

let arrow = {
  ">": { A: "^", v: "<" },
  v: { ">": ">", "^": "^", "<": "<" },
  "<": { v: ">" },
  "^": { A: ">", v: "v" },
  A: { ">": "v", "^": "<" },
};

function key(x, y) {
  return `${x}|${y}`;
}

function bfs(map, start, target, cache) {
  let kk = key(start, target);
  if (kk in cache) {
    return cache[kk];
  }

  let queue = [[start, "", ""]];
  let res = [];
  let visited = new Set();
  while (queue.length) {
    let [cur, path] = queue.shift();
    if (res.length && res[0].length < path.length) {
      continue;
    }

    if (cur === target) {
      res.push(path + "A");
      continue;
    }

    for (let [k, v] of Object.entries(map[cur])) {
      queue.push([k, path + v]);
      visited.add(key(cur, k));
    }

    queue.sort((a, b) => a[1].length - b[1].length);
  }

  cache[kk] = res;
  return res;
}

let numCache = {};
let arrowsCache = {};

function solveArrow(word) {
  let prev = "A";
  let path = [""];
  for (let ch of word) {
    let tmp = bfs(arrow, prev, ch, arrowsCache);
    path = tmp.flatMap((t) => path.map((i) => i + t));
    prev = ch;
  }
  path.sort((a, b) => a.length - b.length);
  return path;
}

function solve(word) {
  let prev = "A";
  let solution = 0;

  for (let ch of word) {
    let paths = bfs(num, prev, ch, numCache);

    let min = Infinity;
    for (let path of paths) {
      let dirPad1 = solveArrow(path);
      for (let dp1 of dirPad1) {
        let dirPad2 = solveArrow(dp1);
        for (let dp2 of dirPad2) {
          if (dp2.length < min) {
            min = dp2.length;
          }
        }
      }
    }
    solution += min;
    prev = ch;
  }

  return solution;
}

let res = 0;
for (let [word, val] of data) {
  res += solve(word) * val;
}
console.log(res);

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
//
//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

let data = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

// data = `AAAA
// BBCD
// BBCC
// EEEC`;

data = Deno.readTextFileSync("12.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let res = 0;
let tp = 0;
let ta = 0;
let visited = new Set();

function dfs(row, col) {
  ta += 1;
  tp += 4;

  let kk = key(row, col);
  let type = data[row][col];
  visited.add(kk);

  for (let [x, y] of [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]) {
    let rx = row + x;
    let cy = col + y;
    if (!inBounds(rx, cy)) {
      continue;
    }

    let neiType = data[rx][cy];
    if (neiType === type) {
      tp -= 1;
    }

    if (!visited.has(key(rx, cy)) && neiType === type) {
      dfs(rx, cy);
    }
  }
}

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[row].length;
}

function key(row, col) {
  return `${row}|${col}`;
}

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[0].length; col++) {
    if (!visited.has(key(row, col))) {
      tp = 0;
      ta = 0;
      dfs(row, col);
      res += tp * ta;
    }
  }
}

console.log(res);

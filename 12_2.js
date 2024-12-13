let data = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

// data = `
// AAAA
// BBCD
// BBCC
// EEEC`;

// data = `EEEEE
// EXXXX
// EEEEE
// EXXXX
// EEEEE`;

// data = `
// AAAAAA
// AAABBA
// AAABBA
// ABBAAA
// ABBAAA
// AAAAAA`;

// data = `
// AAABB
// XAXBX
// `;

// data = `
// AXXA
// AAAA
// ABCA
// BBCC
// EBEC
// BBEC`;

// data = `
// AXA
// AAA
// AXA`;

data = Deno.readTextFileSync("12.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let res = 0;
let ta = 0;
let visited = new Set();

function dfs(row, col, cmp, items) {
  ta += 1;

  let type = data[row][col];
  data[row][col] = cmp;
  items.push([row, col]);

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
      dfs(rx, cy, cmp, items);
    }
  }
}

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[row].length;
}

let key = (row, col) => `${row}|${col}`;

function isInterior(row, col, type) {
  for (let [x, y] of [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ]) {
    let rx = row + x;
    let cy = col + y;

    if (!inBounds(rx, cy)) {
      return false;
    }

    if (data[rx][cy] !== type) {
      return false;
    }
  }

  return true;
}

function getVal(row, col) {
  return inBounds(row, col) ? data[row][col] : null;
}

function checkCorners(corners) {
  let angles = 0;

  for (let [row, col] of corners) {
    let val = data[row][col];

    let top = getVal(row - 1, col);
    let topLeft = getVal(row - 1, col - 1);
    let left = getVal(row, col - 1);
    let bottomLeft = getVal(row + 1, col - 1);
    let bottom = getVal(row + 1, col);
    let bottomRight = getVal(row + 1, col + 1);
    let right = getVal(row, col + 1);
    let topRight = getVal(row - 1, col + 1);

    // top left
    if (top !== val && left !== val) {
      angles += 1;
    }

    // top left diag
    if (top === val && left === val && topLeft !== val) {
      angles += 1;
    }

    // top right
    if (top !== val && right !== val) {
      angles += 1;
    }

    // top right diag
    if (top === val && right === val && topRight !== val) {
      angles += 1;
    }

    // bottom left
    if (left !== val && bottom !== val) {
      angles += 1;
    }

    // bottom right
    if (right !== val && bottom !== val) {
      angles += 1;
    }

    // bottom left diag
    if (left === val && bottom === val && bottomLeft !== val) {
      angles += 1;
    }

    // bottom right diag
    if (right === val && bottom === val && bottomRight !== val) {
      angles += 1;
    }
  }

  return angles;
}

let cmp = 1;
for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[0].length; col++) {
    if (!("" + data[row][col]).includes("[") && !parseInt(data[row][col])) {
      ta = 0;
      const items = [];
      dfs(row, col, cmp, items);
      let tr = checkCorners(items);
      res += ta * tr;
      cmp++;
    }
  }
}

console.log(res);

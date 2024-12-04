let data = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

data = await Deno.readTextFile("4.txt");

let grid = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let res = 0;

function inBounds(row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

function check(row, col) {
  let w1 = ["A"];
  let w2 = ["A"];

  // top left
  let tlr = row - 1;
  let tlc = col - 1;
  if (!inBounds(tlr, tlc)) return;
  w1.push(grid[tlr][tlc]);

  // bottom rightg
  let brr = row + 1;
  let brc = col + 1;
  if (!inBounds(brr, brc)) return;
  w1.push(grid[brr][brc]);

  // top right
  let trr = row - 1;
  let trc = col + 1;
  if (!inBounds(trr, trc)) return;
  w2.push(grid[trr][trc]);

  // bottom left
  let blr = row + 1;
  let blc = col - 1;
  if (!inBounds(blr, blc)) return;
  w2.push(grid[blr][blc]);

  w1.sort();
  w2.sort();

  if (w1.join() === w2.join() && w1.join("") === "AMS") {
    res++;
  }
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === "A") {
      check(row, col);
    }
  }
}

console.log(res);

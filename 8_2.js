let data = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

// data = `T.........
// ...T......
// .T........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........`;

data = await Deno.readTextFile("8.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let res = 0;

let freqToAntMap = {};
let lines = [];

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[row].length; col++) {
    let ch = data[row][col];
    if (ch === ".") continue;

    freqToAntMap[ch] = freqToAntMap[ch] || [];
    freqToAntMap[ch].push([row, col]);
  }
}

for (let ant of Object.keys(freqToAntMap)) {
  for (let s = 0; s < freqToAntMap[ant].length; s++) {
    for (let e = s + 1; e < freqToAntMap[ant].length; e++) {
      lines.push([
        freqToAntMap[ant][s],
        slope(freqToAntMap[ant][s], freqToAntMap[ant][e]),
      ]);
    }
  }
}

let visited = new Set();

for (let [p1, d] of lines) {
  let np1 = p1;

  while (inBounds(np1)) {
    if (data[np1[0]][np1[1]] !== "#") {
      res++;
      data[np1[0]][np1[1]] = "#";
    }
    np1 = [np1[0] - d[0], np1[1] - d[1]];
  }

  np1 = p1;
  while (inBounds(np1)) {
    if (data[np1[0]][np1[1]] !== "#") {
      res++;
      data[np1[0]][np1[1]] = "#";
    }
    np1 = [np1[0] + d[0], np1[1] + d[1]];
  }
}

// console.log(freqToAntMap);
// console.log(lines);
// console.log(data.map((line) => line.join("")).join("\n"));

console.log(res);

function inBounds(p) {
  return p[0] >= 0 && p[0] < data.length && p[1] >= 0 && p[1] < data[0].length;
}

function slope(p1, p2) {
  return [p2[0] - p1[0], p2[1] - p1[1]];
}

// Create equal distance segments
// Construct lines
// 50x50 grid
//
//    a
//    b
// ......#....#
// ...#....0...
// ....#0....#.
// ..#....0....
// ....0....#..
// .#....A.....
// ...#........
// #......#....
// ........A...
// .........A..
// ..........#.
// ..........#.
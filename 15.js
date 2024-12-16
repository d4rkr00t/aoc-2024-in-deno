let data = `
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

data = Deno.readTextFileSync("15.txt");

data = data.trim();

let [grid, moves] = data.split("\n\n");

grid = grid
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

moves = moves
  .trim()
  .split("\n")
  .flatMap((line) => line.trim().split(""));

let pos = null;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "@") {
      pos = [row, col];
    }
  }
}

function key(row, col) {
  return `${row}|${col}`;
}

function calcResult() {
  let res = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "O") {
        res += row * 100 + col;
      }
    }
  }

  return res;
}

let dirMap = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};
let move = 0;

function getVal(row, col) {
  return inBounds(row, col) ? grid[row][col] : null;
}

function inBounds(row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col <= grid[row].length;
}

function canMove(pos, dir) {
  while (true) {
    if (!inBounds(...pos)) {
      return false;
    }

    if (getVal(...pos) === "#") {
      return false;
    }

    if (getVal(...pos) === ".") {
      return pos;
    }

    pos = [pos[0] + dir[0], pos[1] + dir[1]];
  }
}

function simulate() {
  while (move < moves.length) {
    let curMove = moves[move];
    let dir = dirMap[curMove];
    move++;

    let end = canMove(pos, dir);
    if (!end) continue;

    let tmp = [...pos];
    let prev = getVal(...pos);
    while (tmp[0] !== end[0] || end[1] !== tmp[1]) {
      tmp = [tmp[0] + dir[0], tmp[1] + dir[1]];
      let val = getVal(...tmp);
      grid[tmp[0]][tmp[1]] = prev;
      prev = val;
    }
    grid[pos[0]][pos[1]] = ".";
    pos = [pos[0] + dir[0], pos[1] + dir[1]];
  }
}

simulate();

console.log(calcResult());

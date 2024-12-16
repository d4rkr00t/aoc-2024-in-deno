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
  .map((line) =>
    line
      .trim()
      .split("")
      .flatMap((item) => {
        if (item === "#") {
          return ["#", "#"];
        }
        if (item === "O") {
          return ["[", "]"];
        }
        if (item === "@") {
          return ["@", "."];
        }
        return [item, item];
      }),
  );

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
      if (grid[row][col] === "[") {
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

function findDotHorizontal(pos, dir) {
  let boxes = [];
  while (inBounds(...pos)) {
    let val = getVal(...pos);
    if (val === "#") {
      return false;
    }

    if (val === "[" || val === "]") {
      boxes.push([pos, val]);
    }

    if (val === ".") {
      return boxes;
    }

    pos = [pos[0] + dir[0], pos[1] + dir[1]];
  }

  return false;
}

function findDotVertical(pos, dir) {
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  let nextVal = getVal(...nextPos);
  if (nextVal === ".") {
    return [];
  }

  if (nextVal === "[" || nextVal === "]") {
    let offset = nextVal === "[" ? 1 : -1;
    let left = findDotVertical(nextPos, dir);
    if (!left) {
      return false;
    }

    let right = findDotVertical([nextPos[0], nextPos[1] + offset], dir);
    if (!right) {
      return false;
    }

    return [
      [nextPos, nextVal],
      [[nextPos[0], nextPos[1] + offset], nextVal === `[` ? "]" : "["],
      ...left,
      ...right,
    ];
  }

  return false;
}

function setVal(pos, val) {
  grid[pos[0]][pos[1]] = val;
}

function moveBoxes(boxes, dir) {
  for (let [pos, val] of boxes) {
    setVal(pos, ".");
    setVal([pos[0] + dir[0], pos[1] + dir[1]], val);
  }
}

function simulate() {
  while (move < moves.length) {
    let curMove = moves[move];
    let dir = dirMap[curMove];
    move++;

    if (curMove === ">" || curMove === "<") {
      let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
      let boxes = findDotHorizontal(pos, dir);
      if (!boxes) {
        continue;
      }
      let cmp =
        curMove === ">"
          ? (a, b) => b[0][1] - a[0][1]
          : (a, b) => a[0][1] - b[0][1];
      boxes.sort(cmp);

      moveBoxes(boxes, dir);
      setVal(pos, ".");
      setVal(nextPos, "@");
      pos = nextPos;
    } else {
      let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
      let boxes = findDotVertical(pos, dir);
      if (!boxes) {
        continue;
      }
      let cmp =
        curMove === "v"
          ? (a, b) => b[0][0] - a[0][0]
          : (a, b) => a[0][0] - b[0][0];
      boxes.sort(cmp);
      moveBoxes(boxes, dir);
      setVal(pos, ".");
      setVal(nextPos, "@");
      pos = nextPos;
    }
  }
}

simulate();

console.log(calcResult());

let w = 101;
let h = 103;
let data = Deno.readTextFileSync("14.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => {
    let [rawP, rawV] = line.trim().split(" ");
    let [x, y] = rawP.replace("p=", "").split(",");
    let [vx, vy] = rawV.replace("v=", "").split(",");
    return [parseInt(x), parseInt(y), parseInt(vx), parseInt(vy)];
  });

let grid = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));

function simulate(robot) {
  let [x, y, vx, vy] = robot;
  grid[y][x] = 0;

  x = x + vx;
  y = y + vy;

  if (x < 0) {
    x += w;
  } else if (x >= w) {
    x = x % w;
  }

  if (y < 0) {
    y += h;
  } else if (y >= h) {
    y = y % h;
  }

  robot[0] = x;
  robot[1] = y;
  robot[2] = vx;
  robot[3] = vy;

  grid[y][x] = 1;
}

function sum(array) {
  return array.reduce((acc, item) => acc + item, 0);
}

function check() {
  for (let i = 1; i < grid.length - 1; i++) {
    if (sum(grid[i]) !== 2) {
      return false;
    }
  }
  return true;
}

let steps = 0;
while (true) {
  for (let robot of data) {
    simulate(robot);
  }

  if (steps % w === 51) {
    console.log(steps + 1);
    console.log(
      grid
        .map((line) => line.map((item) => (item === 0 ? " " : "X")).join(" "))
        .join("\n"),
    );
    console.log();
    console.log("-".padStart(w, "-"));
    console.log();
  }

  if (steps % w === 51) {
    const shouldProceed = confirm("Do you want to proceed?");
    console.log("Should proceed?", shouldProceed);
    if (!shouldProceed) {
      break;
    }
  }

  steps++;
}

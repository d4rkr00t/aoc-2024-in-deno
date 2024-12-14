let w;
let h;
let data = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
w = 11;
h = 7;

data = Deno.readTextFileSync("14.txt");
w = 101;
h = 103;

data = data
  .trim()
  .split("\n")
  .map((line) => {
    let [rawP, rawV] = line.trim().split(" ");
    let [x, y] = rawP.replace("p=", "").split(",");
    let [vx, vy] = rawV.replace("v=", "").split(",");
    return [parseInt(x), parseInt(y), parseInt(vx), parseInt(vy)];
  });

let q1 = [0, 0, Math.floor(w / 2), Math.floor(h / 2)];
let q2 = [Math.ceil(w / 2), 0, w, Math.floor(h / 2)];
let q3 = [0, Math.ceil(h / 2), Math.floor(w / 2), h];
let q4 = [Math.ceil(w / 2), Math.ceil(h / 2), w, h];
let qs = [0, 0, 0, 0];
let qpos = [q1, q2, q3, q4];

function isInside(x, y, q) {
  return x >= q[0] && x < q[2] && y >= q[1] && y < q[3];
}

function simulate(x, y, vx, vy) {
  let steps = 100;
  while (steps) {
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

    steps--;
  }

  for (let i = 0; i < qpos.length; i++) {
    let q = qpos[i];
    if (isInside(x, y, q)) {
      qs[i]++;
      break;
    }
  }

  // console.log(x, y);
}

for (let robot of data) {
  simulate(...robot);
}

console.log(
  qs.reduce((acc, item) => {
    acc = acc * (item || 1);
    return acc;
  }, 1),
);

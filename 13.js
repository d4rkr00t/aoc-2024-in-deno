let data = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

data = Deno.readTextFileSync("13.txt");

data = data
  .trim()
  .split("\n\n")
  .map((input) => {
    let [ba, bb, p] = input.split("\n");
    let [bax, bay] = ba.replace("Button A: X+", "").split(", Y+");
    let [bbx, bby] = bb.replace("Button B: X+", "").split(", Y+");
    let [tx, ty] = p.replace("Prize: X=", "").split(", Y=");
    return [
      parseInt(bax),
      parseInt(bay),
      parseInt(bbx),
      parseInt(bby),
      parseInt(tx),
      parseInt(ty),
    ];
  });

let res = 0;

function find(ax, ay, bx, by, tx, ty) {
  let A = (ty * bx - by * tx) / (ay * bx - by * ax);
  let B = (tx - ax * A) / bx;

  if (Math.floor(A) === A && Math.floor(B) === B) {
    return A * 3 + B;
  }
  return 0;
}

for (let input of data) {
  res += find(...input, 0);
}

console.log(res);

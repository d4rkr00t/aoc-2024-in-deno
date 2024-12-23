let times = 2000;
// let times = 10;

let data = `1
10
100
2024`;

data = Deno.readTextFileSync("22.txt");

data = data.trim().split("\n").map(Number);

function sim(number) {
  let res = number;
  let iter = 0;
  while (iter < times) {
    let tmp = ((res * 64n) ^ res) % 16777216n;
    tmp = (BigInt(Math.floor(Number(tmp) / 32)) ^ tmp) % 16777216n;
    tmp = ((tmp * 2048n) ^ tmp) % 16777216n;
    iter++;
    res = tmp;
  }

  return res;
}

let res = 0n;

for (let num of data) {
  res += sim(BigInt(num));
}

console.log(res);

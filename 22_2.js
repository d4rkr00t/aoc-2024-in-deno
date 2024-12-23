let times = 2000;

let data = `1
2
3
2024`;

data = Deno.readTextFileSync("22.txt");

data = data.trim().split("\n").map(Number);

function getPrice(num) {
  let numStr = "" + num;
  return Number(numStr[numStr.length - 1]);
}

function sim(number) {
  let res = number;
  let iter = 0;
  let seq = [[getPrice(number), 0]];
  while (iter < times) {
    let tmp = ((res * 64n) ^ res) % 16777216n;
    tmp = (BigInt(Math.floor(Number(tmp) / 32)) ^ tmp) % 16777216n;
    tmp = ((tmp * 2048n) ^ tmp) % 16777216n;
    iter++;
    res = tmp;

    let prevPrice = seq.at(-1)[0];
    let currPrice = getPrice(res);
    let diff = currPrice - prevPrice;
    seq.push([currPrice, diff]);
    //
  }

  return seq;
}

let seqs = [];

for (let num of data) {
  seqs.push(sim(BigInt(num)));
}

function key(x, y, z, u) {
  return `${x}|${y}|${z}|${u}`;
}

let mergedSeqs = {};
function processSeq(seq, idx) {
  let cur = [];
  for (let i = 0; i < seq.length; i++) {
    if (cur.length === 4) {
      let k = key(...cur);
      cur.shift();

      mergedSeqs[k] = mergedSeqs[k] ?? { $: 0 };
      if (!(idx in mergedSeqs[k])) {
        mergedSeqs[k][idx] = seq[i - 1][0];
        mergedSeqs[k]["$"] += seq[i - 1][0];
      }
    }
    cur.push(seq[i][1]);
  }
}

for (let i = 0; i < seqs.length; i++) {
  let seq = seqs[i];
  processSeq(seq, i);
}

let max = 0;

for (let [k, v] of Object.entries(mergedSeqs)) {
  max = Math.max(max, v["$"]);
}

console.log(max);

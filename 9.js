let data = `2333133121414131402`;

data = Deno.readTextFileSync("9.txt").trim();

let decoded = [];
let fid = 0;

for (let i = 0; i < data.length; i++) {
  let n = +data[i];
  for (let j = 0; j < n; j++) {
    if (i % 2 === 0) {
      decoded.push(fid);
    } else {
      decoded.push(".");
    }
  }

  if (i % 2 === 0) {
    fid++;
  }
}

console.log(decoded.join(""));

let lo = 0;
let hi = decoded.length - 1;

while (lo < hi) {
  if (decoded[lo] !== ".") {
    lo++;
    continue;
  }

  if (decoded[hi] === ".") {
    hi--;
    continue;
  }

  [decoded[lo], decoded[hi]] = [decoded[hi], decoded[lo]];
}

console.log(decoded.join(""));

let res = 0;

for (let i = 0; i < decoded.length; i++) {
  if (decoded[i] === ".") break;
  res += i * decoded[i];
}

console.log(res);

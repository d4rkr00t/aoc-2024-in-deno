let data = `2333133121414131402`;
let empty = [];
let blocks = [];

data = Deno.readTextFileSync("9.txt").trim();

let decoded = [];
let fid = 0;
let pos = 0;
let max = 0;

for (let i = 0; i < data.length; i++) {
  let n = +data[i];
  if (i % 2 === 0) {
    blocks.push([fid, n, pos, pos + n]);
    pos += n;
  } else if (n) {
    empty.push([pos, pos + n, n]);
    pos += n;
    max = Math.max(n, max);
  }

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

while (blocks.length) {
  let [fid, size, x1, _] = blocks.pop();
  for (let i = 0; i < empty.length; i++) {
    let [x2, _, size2] = empty[i];
    if (size <= size2) {
      if (x2 > x1) {
        break;
      }

      empty[i] = [x2 + size, x2 + size2, size2 - size];
      for (let j = 0; j < size; j++) {
        decoded[x2 + j] = fid;
        decoded[x1 + j] = ".";
      }
      break;
    }
  }
}

let res = 0;

for (let i = 0; i < decoded.length; i++) {
  if (decoded[i] === ".") continue;
  res += i * decoded[i];
}

console.log(res);

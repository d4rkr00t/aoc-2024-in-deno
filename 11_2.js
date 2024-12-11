let data = `125 17`;

data = Deno.readTextFileSync("11.txt").trim();

let input = data.split(" ").map(Number);

let maxDepth = 75;
let cache = new Map();

function blink(depth, item) {
  let key = `${depth}|${item}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (depth === maxDepth) {
    return 1;
  }

  let res = 0;
  if (item === 0) {
    res = blink(depth + 1, 1);
  } else if (item === 1) {
    res = blink(depth + 1, 2024);
  } else if (`${item}`.length % 2 === 0) {
    let str = `${item}`;
    let left = str.split("").slice(0, str.length / 2);
    let right = str.split("").slice(str.length / 2);
    res = blink(depth + 1, Number(left.join("")));
    res += blink(depth + 1, Number(right.join("")));
  } else {
    res = blink(depth + 1, item * 2024);
  }

  cache.set(key, res);
  return res;
}

let res = 0;
for (let item of input) {
  res += blink(0, item);
}

console.log(res);

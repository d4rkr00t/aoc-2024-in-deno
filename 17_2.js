function calc(A) {
  let B = A % 8n ^ (A >> (A % 8n ^ 1n));
  return (B ^ 5n) % 8n;
}

let bits = ["000", "001", "010", "100", "011", "110", "111", "101"];

let prog = [2, 4, 1, 1, 7, 5, 4, 4, 1, 4, 0, 3, 5, 5, 3, 0];

function find(target, cur) {
  let num = cur.toString(2);
  let res = [];
  for (let b of bits) {
    let next = BigInt("0b" + num + b);
    if (calc(next) == target) {
      res.push(next);
    }
  }
  return res;
}

let min = Infinity;

function dfs(pos, cur) {
  if (pos === -1) {
    if (min > cur) {
      min = cur;
    }
    return;
  }

  let target = prog[pos];
  let res = find(target, cur);

  for (let r of res) {
    dfs(pos - 1, r);
  }
}

dfs(prog.length - 1, 0);
console.log(min);

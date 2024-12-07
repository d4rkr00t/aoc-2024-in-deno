let data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

data = await Deno.readTextFile("7.txt");

let eqs = data
  .trim()
  .split("\n")
  .map((line) => {
    let [test, numsStr] = line.trim().split(": ");
    let nums = numsStr.split(" ").map((item) => parseInt(item.trim()));
    return [parseInt(test), nums];
  });

let visited = new Set();

function backtrack(test, nums, pos, cur) {
  let stack = [[cur, pos]];
  while (stack.length) {
    let [cur, pos] = stack.pop();
    if (pos === nums.length) {
      if (cur === test) {
        res += test;
        return;
      }
      continue;
    }

    stack.push([cur + nums[pos], pos + 1]);
    stack.push([cur * nums[pos], pos + 1]);
    stack.push([parseInt(`${cur}${nums[pos]}`), pos + 1]);
  }
}

let res = 0;

for (let [test, nums] of eqs) {
  backtrack(test, nums, 1, nums[0]);
}

console.log(res);

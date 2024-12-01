// let data = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

let data = await Deno.readTextFile("1.txt");

let [l1, l2] = data
  .trim()
  .split("\n")
  .map((line) => line.split("   "))
  .reduce(
    (acc, pair) => {
      acc[0].push(parseInt(pair[0]));
      acc[1].push(parseInt(pair[1]));
      return acc;
    },
    [[], []],
  );

let l2m = l2.reduce((acc, item) => {
  acc[item] = acc[item] ?? 0;
  acc[item]++;
  return acc;
}, {});

let sum = 0;
for (let i = 0; i < l1.length; i++) {
  sum += l1[i] * (l2m[l1[i]] ?? 0);
}

console.log(sum);

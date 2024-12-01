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

l1.sort((a, b) => a - b);
l2.sort((a, b) => a - b);

let diff = 0;
for (let i = 0; i < l1.length; i++) {
  diff += Math.abs(l1[i] - l2[i]);
}

console.log(diff);

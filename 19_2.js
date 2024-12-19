let data = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

data = Deno.readTextFileSync("19.txt");

let [towels, designs] = data.trim().split("\n\n");
towels = new Set(towels.trim().split(", "));
designs = designs
  .trim()
  .split("\n")
  .map((item) => item.trim());

let res = 0;

function backtrack(pos, design) {
  let dp = Array.from({ length: design.length + 1 }, () => 0);
  dp[dp.length - 1] = 1;

  while (pos >= 0) {
    let count = 0;

    for (let towel of towels.values()) {
      if (design.startsWith(towel, pos)) {
        count += dp[pos + towel.length];
      }
    }

    dp[pos] = count;
    pos--;
  }

  res += dp[0];
}

for (let design of designs) {
  backtrack(design.length - 1, design);
}

console.log(res);

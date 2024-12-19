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

let res = new Set();
function backtrack(pos, design, visited = {}) {
  if (pos in visited) {
    return;
  }

  if (res.has(design)) {
    return;
  }

  if (pos === design.length) {
    res.add(design);
    return;
  }

  visited[pos] = true;

  for (let towel of towels.values()) {
    if (design.startsWith(towel, pos)) {
      backtrack(pos + towel.length, design, visited);
    }
  }
}

for (let design of designs) {
  backtrack(0, design);
}

console.log(res.size);

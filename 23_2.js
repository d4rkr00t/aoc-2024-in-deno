import { combinations } from "https://deno.land/x/combinatorics/mod.ts";

let data = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

data = Deno.readTextFileSync("23.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split("-"));

let graph = {};
let pcs = new Set();

for (let [f, t] of data) {
  graph[f] = graph[f] ?? [];
  graph[t] = graph[t] ?? [];
  graph[f].push(t);
  graph[t].push(f);
  pcs.add(f);
  pcs.add(t);
}

function checkSingle(pc, conns) {
  return conns.every((con) => graph[pc].includes(con));
}

function check(...pcs) {
  for (let i = 0; i < pcs.length; i++) {
    if (!checkSingle(pcs[i], pcs.toSpliced(i, i + 1))) {
      return false;
    }
  }

  return true;
}

let res = [];
function findCon(pc) {
  let children = graph[pc];
  for (let i = children.length; i >= 0; i--) {
    let combs = [...combinations(children, i)];
    for (let cmb of combs) {
      if (res && res.length > cmb.length + 1) {
        return;
      }
      if (check(...cmb, pc)) {
        res = [...cmb, pc];
        return;
      }
    }
  }
}

for (let pc of pcs.values()) {
  findCon(pc);
}

console.log(res.sort().join(","));

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

let connections = [];
let visited = new Set();

function checkSingle(pc, conns) {
  return conns.every((con) => graph[pc].includes(con));
}

function check(pc0, pc1, pc2) {
  return (
    checkSingle(pc0, [pc1, pc2]) &&
    checkSingle(pc1, [pc0, pc2]) &&
    checkSingle(pc2, [pc0, pc1])
  );
}

let res = 0;
function findCon(pc) {
  let children = graph[pc];
  let combs = [...combinations(children, 2)];

  for (let cmb of combs) {
    if (check(...cmb, pc)) {
      let con = [...cmb, pc].toSorted();
      if (!visited.has(con.join(","))) {
        connections.push(con);
        visited.add(con.join(","));
        if (con.some((c) => c.startsWith("t"))) {
          res++;
        }
      }
    }
  }
}

for (let pc of pcs.values()) {
  findCon(pc);
}

console.log(connections);
console.log(res);

let data = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;

data = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;

data = Deno.readTextFileSync("24.txt");

let [initialStatesData, connectionsData] = data.trim().split("\n\n");

function createEmptyWire() {
  return {
    state: null,
    connections: [],
  };
}

let wires = {};

for (let line of connectionsData.split("\n")) {
  let [gateData, outgoing] = line.trim().split(" -> ");
  if (!(outgoing in wires)) {
    wires[outgoing] = createEmptyWire();
  }
  let [left, type, right] = gateData.trim().split(" ");

  let con = {
    type: type,
    deps: [left, right],
    target: outgoing,
  };
  wires[left] = wires[left] || createEmptyWire();
  wires[left].connections.push(con);

  wires[right] = wires[right] || createEmptyWire();
  wires[right].connections.push(con);
}

// console.log(wires);

function simulate(wire, state) {
  // console.log("sim", wire, state);
  wires[wire].state = state;
  for (let conn of wires[wire].connections) {
    let dep0 = wires[conn.deps[0]].state;
    let dep1 = wires[conn.deps[1]].state;

    if (dep0 === null || dep1 === null) {
      continue;
    }

    // console.log(wire, state, conn.target, dep0, dep1, conn.type);

    switch (conn.type) {
      case "AND":
        simulate(conn.target, dep0 & dep1);
        break;
      case "OR":
        simulate(conn.target, dep0 | dep1);
        break;
      case "XOR":
        simulate(conn.target, dep0 ^ dep1);
        break;
    }
  }
}

for (let line of initialStatesData.split("\n")) {
  let [wire, state] = line.trim().split(": ");
  simulate(wire, parseInt(state));
}

let zWires = Object.keys(wires).filter((key) => key.startsWith("z"));
zWires.sort();
zWires.reverse();
console.log(zWires);

let res = 0;
let resStr = "";

for (let w of zWires) {
  resStr += wires[w].state;
}

console.log(parseInt(resStr, 2));

console.log("-----");
// console.log(wires);

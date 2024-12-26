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

let registers = 5;
data = Deno.readTextFileSync("24.txt");
registers = 45;

let [initialStatesData, connectionsData] = data.trim().split("\n\n");

let initialStates = initialStatesData
  .trim()
  .split("\n")
  .map((line) => {
    let [name, val] = line.trim().split(": ");
    return [name, parseInt(val)];
  });

let connections = connectionsData
  .trim()
  .split("\n")
  .map((line) => {
    let [left, op, right, , out] = line.split(" ");
    let lr = [left, right].toSorted();
    return [...lr, op, out];
  });

let inOutMap = new Map();

function updateMap(a, b, op, out) {
  inOutMap.set(getKey(a, b, op), out);
}

for (let con of connections) {
  updateMap(...con);
}

function getKey(a, b, op) {
  return [...[a, b].toSorted(), op].join(",");
}

function getOut(a, b, op) {
  if (op === "OR" || op === "XOR") {
    if (a === undefined || a === "0") return b;
    if (b === undefined || b === "0") return a;
  }

  let key = getKey(a, b, op);
  return inOutMap.get(key) || "0";
}

let carry = [];
let swapped = [];
let i = 0;

while (i < registers) {
  let wire = ("" + i).padStart(2, "0");
  let xWire = "x" + wire;
  let yWire = "y" + wire;
  let zWire = "z" + wire;

  let PREV_CARRY = carry[i - 1];

  let A_XOR_B = getOut(xWire, yWire, "XOR");
  let A_AND_B = getOut(xWire, yWire, "AND");
  let A_XOR_B_AND_C = getOut(A_XOR_B, PREV_CARRY, "AND");
  let CARRY = getOut(A_XOR_B_AND_C, A_AND_B, "OR");
  let SUM = getOut(A_XOR_B, PREV_CARRY, "XOR");
  carry[i] = CARRY;

  if (SUM === zWire) {
    i++;
    continue;
  }

  if (A_XOR_B === zWire) {
    updateMap(xWire, yWire, "XOR", SUM);
    updateMap(A_XOR_B, PREV_CARRY, "XOR", zWire);
    swapped.push([SUM, zWire]);
  } else if (A_AND_B === zWire) {
    updateMap(xWire, yWire, "AND", SUM);
    updateMap(A_XOR_B, PREV_CARRY, "XOR", zWire);
    swapped.push([SUM, zWire]);
  } else if (A_XOR_B_AND_C === zWire) {
    updateMap(A_XOR_B, PREV_CARRY, "AND", SUM);
    updateMap(A_XOR_B, PREV_CARRY, "XOR", zWire);
    swapped.push([SUM, zWire]);
  } else if (PREV_CARRY === zWire) {
    updateMap(A_AND_B, A_XOR_B_AND_C, "OR", SUM);
    updateMap(A_XOR_B, PREV_CARRY, "XOR", zWire);
    swapped.push([SUM, zWire]);
  } else if (CARRY === zWire) {
    updateMap(A_AND_B, A_XOR_B_AND_C, "OR", SUM);
    updateMap(A_XOR_B, PREV_CARRY, "XOR", zWire);
    swapped.push([SUM, zWire]);
  } else if (A_XOR_B_AND_C === "0") {
    updateMap(xWire, yWire, "XOR", A_AND_B);
    updateMap(xWire, yWire, "AND", A_XOR_B);
    swapped.push([A_AND_B, A_XOR_B]);
  } else {
    console.log("can't fix");
    console.log(xWire);
    console.log(yWire);
    console.log(zWire);
    console.log(PREV_CARRY);
    console.log(A_XOR_B);
    console.log(A_AND_B);
    console.log(A_XOR_B_AND_C);
    console.log(SUM);
    console.log(CARRY);
    console.log("----");
    break;
  }
}

console.log(swapped.flat().toSorted().join(","));

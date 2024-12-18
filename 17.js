let data = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

data = Deno.readTextFileSync("17.txt");

data = data.trim();

let [regData, progData] = data.split("\n\n");
let reg = {};

let [regAData, regBData, regCData] = regData
  .split("\n")
  .map((line) => line.trim());

reg.A = Number(regAData.replace("Register A: ", ""));
reg.B = Number(regBData.replace("Register B: ", ""));
reg.C = Number(regCData.replace("Register C: ", ""));

let prog = progData.replace("Program: ", "").trim().split(",").map(Number);

let output = [];

function getCombOpVal(op) {
  if (op >= 0 && op <= 3) {
    return op;
  } else if (op === 4) {
    return reg.A;
  } else if (op === 5) {
    return reg.B;
  } else if (op === 6) {
    return reg.C;
  }

  throw new Error("Invalid comb operator", op);
}

function adv(op) {
  let num = reg.A;
  let denum = 2 ** getCombOpVal(op);
  reg.A = Math.trunc(num / denum);
}

function bxl(op) {
  reg.B = reg.B ^ op;
}

function bst(op) {
  reg.B = getCombOpVal(op) % 8;
}

function jnz(op) {
  if (!reg.A) {
    return -1;
  }

  return op;
}

function bxc(_op) {
  reg.B = reg.B ^ reg.C;
}

function out(op) {
  output.push(getCombOpVal(op) % 8);
}

function bdv(op) {
  let num = reg.A;
  let denum = 2 ** getCombOpVal(op);
  reg.B = Math.trunc(num / denum);
}

function cdv(op) {
  let num = reg.A;
  let denum = 2 ** getCombOpVal(op);
  reg.C = Math.trunc(num / denum);
}

function execute() {
  let ic = 0;
  while (ic < prog.length - 1) {
    let inst = prog[ic];
    let op = prog[ic + 1];
    // console.log({ reg, inst, op });

    if (inst === 0) {
      adv(op);
    } else if (inst === 1) {
      bxl(op);
    } else if (inst === 2) {
      bst(op);
    } else if (inst === 3) {
      let loc = jnz(op);
      if (loc !== -1) {
        ic = loc;
        continue;
      }
    } else if (inst === 4) {
      bxc(op);
    } else if (inst === 5) {
      out(op);
    } else if (inst === 6) {
      bdv(op);
    } else if (inst === 7) {
      cdv(op);
    }

    ic += 2;
  }
}

execute();

console.log(reg, prog);
console.log(output.join(","));

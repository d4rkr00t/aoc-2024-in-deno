let data = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

data = await Deno.readTextFile("2.txt");

let reports = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

function isInc(report) {
  let prev = report[0];
  for (let i = 1; i < report.length; i++) {
    if (prev >= report[i]) {
      return false;
    }

    let diff = report[i] - prev;
    if (diff > 3) {
      return false;
    }
    prev = report[i];
  }

  return true;
}

function isDec(report) {
  let prev = report[0];
  for (let i = 1; i < report.length; i++) {
    if (prev <= report[i]) {
      return false;
    }

    let diff = prev - report[i];
    if (diff > 3) {
      return false;
    }
    prev = report[i];
  }

  return true;
}

let safe = 0;

for (let report of reports) {
  if (report[0] < report[1]) {
    if (isInc(report)) {
      safe += 1;
    }
  } else {
    if (isDec(report)) {
      safe += 1;
    }
  }
}

console.log(safe);

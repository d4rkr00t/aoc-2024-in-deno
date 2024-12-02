let data = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
1 2 3 4 1
4 1 2 3 4
1 1 2 3 4
3 4 2 1 0
5 5 4 3 2
5 5 5 4 3
5 4 3 1 2
7 10 13 14 16 19 18 22
1 5 4 3 2`;

data = await Deno.readTextFile("2.txt");

let reports = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

function check(report, cond, recovered = false) {
  let prev = report[0];
  for (let i = 1; i < report.length; i++) {
    if (!cond(prev, report[i])) {
      if (recovered) {
        return false;
      }

      let next = [...report];
      next.splice(i, 1);

      if (check(next, cond, true)) {
        return true;
      }

      next = [...report];
      next.splice(i - 1, 1);
      return check(next, cond, true);
    }

    prev = report[i];
  }
  return true;
}

function isInc(p, n) {
  return p < n && n - p <= 3;
}

function isDec(p, n) {
  return p > n && p - n <= 3;
}

let safe = 0;

for (let report of reports) {
  if (check(report, isInc) || check(report, isDec)) {
    safe += 1;
  }
}

console.log(safe);

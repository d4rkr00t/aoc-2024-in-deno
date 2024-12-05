let data = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

data = await Deno.readTextFile("5.txt");

let res = 0;

let [graphData, updatesData] = data.split("\n\n");

let graph = {};
graphData
  .trim()
  .split("\n")
  .forEach((line) => {
    let [f, t] = line.trim().split("|");
    graph[f] = graph[f] || [];
    graph[t] = graph[t] || [];
    graph[t].push(f);
  });

let updates = updatesData
  .trim()
  .split("\n")
  .map((line) => line.trim().split(","));

let validUpdates = [];
function validate(update) {
  for (let i = 0; i < update.length; i++) {
    let node = update[i];
    if (
      !graph[node].every((n) => {
        let idx = update.indexOf(n);
        return idx < i || idx === -1;
      })
    ) {
      validUpdates.push(update);
      return;
    }
  }
}

for (let update of updates) {
  validate(update);
}

for (let update of validUpdates) {
  update.sort((a, b) => {
    if (graph[a].includes(b)) {
      return 1;
    } else if (graph[b].includes(a)) {
      return -1;
    }
    return 0;
  });
  res += ~~update[Math.floor(update.length / 2)];
}

console.log(res);

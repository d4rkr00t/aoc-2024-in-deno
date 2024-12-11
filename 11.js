let data = `0 1 10 99 999`;
data = `125 17`;

data = Deno.readTextFileSync("11.txt").trim();

let input = data.split(" ").map(Number);

function blink() {
  let next = [];

  for (let item of input) {
    if (item === 0) {
      next.push(1);
    } else if (item === 1) {
      next.push(item * 2024);
    } else if (`${item}`.length % 2 === 0) {
      let str = `${item}`;
      let left = str.split("").slice(0, str.length / 2);
      let right = str.split("").slice(str.length / 2);
      next.push(Number(left.join("")));
      next.push(Number(right.join("")));
    } else {
      next.push(item * 2024);
    }
  }

  input = next;
}

for (let i = 0; i < 25; i++) {
  blink();
}

console.log(input.length);

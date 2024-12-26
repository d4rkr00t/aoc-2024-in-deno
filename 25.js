let data = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

data = Deno.readTextFileSync("25.txt");

let locks = [];
let keys = [];

function parse(str) {
  let data = [0, 0, 0, 0, 0];
  for (let line of str.split("\n")) {
    for (let i = 0; i < line.trim().length; i++) {
      if (line[i] === "#") {
        data[i] += 1;
      }
    }
  }

  return data;
}

for (let item of data.split("\n\n")) {
  if (item[0] === ".") {
    // key
    keys.push(parse(item.trim()));
  } else {
    // lock
    locks.push(parse(item.trim()));
  }
}

function check(lock, key) {
  for (let i = 0; i < lock.length; i++) {
    if (lock[i] + key[i] > 7) {
      return false;
    }
  }
  return true;
}

let res = 0;
function findKeys(lock) {
  for (let key of keys) {
    if (check(lock, key)) {
      res++;
    }
  }
}

for (let lock of locks) {
  findKeys(lock);
}

console.log(res);
console.log("keys", keys.length);
console.log("locks", locks.length);

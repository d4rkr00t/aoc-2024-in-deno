let data = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

data = await Deno.readTextFile("3.txt");

let chars = data.split("");
let res = 0;

function parse(pos) {
  while (pos < data.length) {
    let err = false;
    let n1 = null;
    let n2 = null;

    [pos, err] = consume("don't()", pos);
    if (!err) {
      while (pos < data.length) {
        [pos, err] = consume("do()", pos);
        if (err) {
          pos++;
        } else {
          break;
        }
      }
    }

    // consume mul
    [pos, err] = consume("mul", pos);
    if (err) {
      pos++;
      continue;
    }

    // consume (
    [pos, err] = consume("(", pos);
    if (err) {
      pos++;
      continue;
    }

    // consume number
    [pos, n1, err] = consumeNumber(pos);
    if (err) {
      pos++;
      continue;
    }

    // consume ,
    [pos, err] = consume(",", pos);
    if (err) {
      pos++;
      continue;
    }

    // consume number
    [pos, n2, err] = consumeNumber(pos);
    if (err) {
      pos++;
      continue;
    }

    // consume )
    [pos, err] = consume(")", pos);
    if (err) {
      pos++;
      continue;
    }

    res += n1 * n2;
  }
}

function consume(what, pos) {
  if (data.startsWith(what, pos)) {
    return [pos + what.length, false];
  }

  return [pos, true];
}

function consumeNumber(pos) {
  let num = 0;
  let seenNum = false;
  while (true) {
    let n = parseInt(data[pos]);
    if (!Number.isInteger(n)) {
      break;
    }
    num = num * 10 + n;
    seenNum = true;
    pos++;
  }

  return [pos, num, !seenNum];
}

parse(0);

console.log(res);

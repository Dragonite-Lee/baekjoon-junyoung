/**
 * 문제설명
 * 소수를 좋아해서 게임 비밀번호를 4자리 소수로 지정했음
 * 비밀번호를 바꾸려고 하는데, 한번에 한자리만 바꿀 수 있음
 * 4자리 소수를 2개받아서 바꾸는데 얼마나 걸리는지 알아내기. 비밀번호는 1000미만은 안됨 항상 4자리 수임
 * 불가능하면 IMPOSSIBLE 출력
 * 아이디어
 * 어떤 수가 소수인지 판별하는 로직을 만들고, 한자리씩 앞에서부터 일치하면 안바꾸고 안일치하면 바꾸는과정을 진행함
 * 시간복잡도
 *
 */
class Deque {
  constructor() {
    this.arr = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }
  push(value) {
    this.arr[this.tail++] = value;
    this.length++;
  }
  popleft() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      this.length--;
      return result;
    }
  }
}
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input);

function is_prime(value) {
  for (let i = 2; i < Math.floor(value / 2) + 1; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return true;
}

let index = 0;
let result = [];
while (index < T) {
  const dq = new Deque();
  const visited = Array(10000).fill(false);

  const [from, to] = arr[index].split(" ").map(Number);
  const from_arr = String(from).split("");
  const to_arr = String(to).split("");
  let sol = -1;
  visited[from] = true;

  dq.push([from, 0]);

  while (dq.length > 0) {
    let [pvalue, pcount] = dq.popleft();
    // console.log("pvalue, pcount: ", pvalue, pcount);
    if (pvalue === to) {
      sol = pcount;
      break;
    }
    pvalue = String(pvalue);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        let temp = Number(pvalue.slice(0, i) + String(j) + pvalue.slice(i + 1));
        // console.log("temp: ", temp);
        if (
          temp >= 1000 &&
          visited[temp] === false &&
          is_prime(temp) === true
        ) {
          visited[temp] = true;
          dq.push([temp, pcount + 1]);
        }
      }
    }
  }
  if (sol === -1) {
    result.push("IMPOSSIBLE");
  } else {
    result.push(sol);
  }
  index++;
}
console.log(result.join("\n"));

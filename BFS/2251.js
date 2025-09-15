/**
 * 문제설명
 * 부피가 A,B,C인 200리터까지 가능한 물통이 있다.
 * 처음에는 앞의 두 물통은 비어있고, 세번째물통은 가득차있다.(C리터)
 * 어떤 물통에 들어있는 물을 다른 물통으로 쏟아 부을 수 있는데,
 * 한 물통이 비거나, 가득찰때까지 부을 수 있다.
 * 첫번째 물통이 비어있을때, 세번째 물통에 담겨있을 수 있는 물의 양을 모두 구해라
 *
 * 아이디어
 * A,B의 양을 알면 C의 양을 알 수 있으니, 방문을 2중배열로하고
 * 3개의 물병에서 물을 부울수있는 액션의 경우를 만들어서 bfs돌리기
 *
 * 시간복잡도
 * bfs는 O(V+E)인데 7이라 2중포문을 만드는 A * B 즉 40,000임
 */

class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  push(item) {
    this.arr[this.tail++] = item;
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
const [input] = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [A, B, C] = input.split(" ").map(Number);
const origin = [A, B, C];

const dq = new Deque();

const visited = Array(A + 1)
  .fill()
  .map(() => Array(B + 1).fill(false));
const from = [0, 0, 1, 1, 2, 2];
const to = [1, 2, 0, 2, 0, 1];
const result = [];

visited[0][0] = true;
result.push(C);
dq.push([0, 0]);
while (dq.length > 0) {
  const arr = dq.popleft();
  const one = arr[0];
  const two = arr[1];
  const three = C - one - two;

  for (let i = 0; i < 6; i++) {
    const bottle = [one, two, three];
    bottle[to[i]] += bottle[from[i]];
    bottle[from[i]] = 0;
    // 물이 흘런 넘친경우
    if (bottle[to[i]] > origin[to[i]]) {
      bottle[from[i]] += bottle[to[i]] - origin[to[i]];
      bottle[to[i]] -= bottle[from[i]];
    }
    // 새로운 케이스인경우
    if (visited[bottle[0]][bottle[1]] === false) {
      visited[bottle[0]][bottle[1]] = true;
      dq.push([bottle[0], bottle[1]]);
      if (bottle[0] === 0) {
        result.push(bottle[2]);
      }
    }
  }
}
console.log(result.sort((a, b) => a - b).join(" "));

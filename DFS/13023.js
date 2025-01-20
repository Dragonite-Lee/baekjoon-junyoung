/**
 * 13023 ABCDE
 * 문제설명
 * 캠프에 N명참가 했고, 0번부터 N-1으로 번호매김
 * 여기서 일부사람들은 친구임
 * a-b 친구 b-c 친구 c-d친구 d-e친구 이렇게 4가지 친구관계가 존재하는지
 * 즉 존재하는 모든 이들이 연결되어잇는지!!!
 * 즉 M개연결된 노드가 있는지!!!
 * 아이디어
 * 연결된 각 정점에 대한 노드를 양방향으로 간주하고 false판단해서
 * for문을 쫙돌면서 구해진 node가 친구관계수와 같은지 확인하기
 * 시간복잡도
 * n은 2000
 */
class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
  append(item) {
    if (this.arr[0]) {
      for (let i = this.arr.length; i > 0; i--) {
        this.arr[i] = this.arr[i - 1];
      }
    }
    this.arr[this.head] = item;
    this.tail++;
    this.length++;
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
  pop() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
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

const [N, M] = input.split(" ").map(Number);
const graph = Array.from({ length: N }, () => []);
for (item of arr) {
  const [a, b] = item.split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
// console.log(graph);

let find = false;
const visited = Array(N).fill(false);

function dfs(start, depth) {
  visited[start] = true;
  if (depth === 5) {
    find = true;
    return;
  }
  for (const next of graph[start]) {
    if (visited[next] === false) {
      dfs(next, depth + 1);
    }
  }
  visited[start] = false;
}

for (let i = 0; i < N; i++) {
  dfs(i, 1);
  if (find) {
    true;
  }
}
if (find) {
  console.log(1);
} else {
  console.log(0);
}

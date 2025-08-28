/**
 * 2056 작업 위상정렬
 * 문제설명
 * 수행해야 할 작업이 N개가 있음 3부터 10,000
 * 각 작업은 걸리는시간 1부터 100으로 주어짐
 * 몇몇 작업들 사이에는 선행 관계가 있어서 어떤 작업 수행전 먼저 완료되야 하는게 있음
 * K번 작업은  1부터 k-1이 그러함
 * 모든 작업 완료하는데 필요한 최소시간을 구하라
 * 선행관계가 없으면 동시에도 가능
 * 아이디어
 * 각각 자기가 실행되기 위해 필수로 선행되는 개수를 체크
 * 선행되어야하는 인덱스에 자기를 넣고
 * 끝나면 next로 움직이며 최소값으로 갱신하며 계산 cost가 next의 코스트보다 작으면 갱신
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
const N = Number(input);

const degree = Array(N + 1).fill(0);
const graph = Array.from({ length: N + 1 }, () => []);
const ar = [0];
const q = new Deque();
let result = Array(N + 1).fill(0);
for (let i = 0; i < N; i++) {
  let item = arr[i].split(" ").map(Number);
  const time = item[0];
  ar.push([i + 1, time]);
  const de_num = item[1];
  degree[i + 1] = de_num;

  if (degree[i + 1] === 0) {
    result[i + 1] = time;
    q.push(i + 1);
  }
  for (let j = 2; j < 2 + de_num; j++) {
    graph[item[j]].push(i + 1);
  }
}
// console.log("degree", degree);
// console.log("graph: ", graph);

while (q.length > 0) {
  const now = q.popleft();
  // console.log('now: ', now);

  for (const next of graph[now]) {
    degree[next] -= 1;
    result[next] = Math.max(result[next], result[now] + ar[next][1]);
    // console.log("result: ", result);
    if (degree[next] === 0) {
      q.push(next);
    }
  }
}
console.log(Math.max(...result));

// 1은 5 선행x
// 2는 1 선행1개 1
// 3은 3 선행1개 2
// 4는 6 선행1개 1
// 5는 1 선행2개 2 4
// 6은 8 선행2개 2 4
// 7은 4 선행3개 3 5 6

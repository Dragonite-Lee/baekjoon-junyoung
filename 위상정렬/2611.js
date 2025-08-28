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
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
const M = Number(arr[0]);

const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = Array(N + 1).fill(0);
const dp = Array(N + 1).fill(0);
for (let i = 1; i < M + 1; i++) {
  const [p, q, r] = arr[1].split(' ').map(Number);
  inDegree[q]++;
  graph[p].push([q, r]);
}

const dq = new Deque();
dq.push([1, 0]);

while (dq.length > 0) {
  const [node, dist] = dq.popleft();
  
  for (const [next_node, next_dist] of graph[node]) {
    inDegree[next_node]--;
    if (dp[next_node] < dist + next_dist) {
      dp[next_node] = dist + next_dist;
      
    }
    if (inDegree[next_node] === 0) {
      if (next_dist > )
    }
  }
}

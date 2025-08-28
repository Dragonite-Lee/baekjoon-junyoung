/**
 * 문제설명
 * 1번부터 N번까지 총 N개의 문제로 되어있는 문제집
 * 문제는 난이도 순서로 출제되어 있음 즉 1번은 젤 쉽고 N번은 젤 어려움
 * N개 모두 풀어야하는데, 먼저 푸는게 좋은게 있다면 그거부터 풀어야함, 가능한 쉬운문제부터 풀어야함
 * 아이디어
 * 위상정렬을 이용해 풀이
 * 힙 우선순위큐를 이용하여 작은거부터 나와야함 start 배열이 우선순위큐여야함
 * 시간복잡도
 * 진입차수와 진출차수의 합이므로 O(V+E)
 */
class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  //요소추가
  heappush(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  //요소제거
  heappop() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  //비어있는지 확인
  isEmpty() {
    return this.heap.length === 0;
  }

  //내부메서드: 요소를 위로 이동
  _bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (element >= parent) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  //내부메서드: 오소를 아래로 이동
  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx] < element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        if (
          (swap === null && this.heap[rightChildIdx] < element) ||
          (swap !== null && this.heap[rightChildIdx] < this.heap[leftChildIdx])
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

N = input[0];
M = input[1];

const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = Array(N + 1).fill(0);

for (item of arr) {
  graph[item[0]].push(item[1]);
  inDegree[item[1]] += 1;
}
// console.log(graph)
const start = new PriorityQueue();
for (let i = 1; i < inDegree.length + 1; i++) {
  if (inDegree[i] === 0) {
    start.heappush(i);
  }
}
// console.log(start);
result = [];
while (!start.isEmpty()) {
  // console.log('start: ', start);
  pop_el = start.heappop();
  result.push(pop_el);

  for (item of graph[pop_el]) {
    // console.log('item: ', item);
    inDegree[item] -= 1;
    if (inDegree[item] === 0) {
      start.heappush(item);
    }
  }
}

console.log(...result);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  getSize() {
    return this.heap.length;
  }
  insert(v) {
    this.heap.push(v);
    this._bubbleUp(this.heap.length - 1);
  }
  remove() {
    if (!this.heap.length) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    if (this.heap.length) this._bubbleDown(0);
    return min;
  }
  _bubbleUp(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  _bubbleDown(i) {
    while (true) {
      let s = i,
        l = 2 * i + 1,
        r = 2 * i + 2;
      if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
      if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
  }
}

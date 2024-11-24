/**
 * 문제설명
 * N개의 숫자로 구분된 마을에 한명의 학생이 살고 있다.
 * N명의 학생이 파티를 하기로했다. 총 M개의 단방향 도로가 있는데 i번째 길을 지나는데, Ti 시간을 소비
 * 걸어갓다가 다시 와야함 누가 가장 많은 시간을 소비하는지 구하라
 * 아이디어
 * 학생마다 반복할건데, x에갓다가 오게끔 해서 시간을 더하기 항상 최소힙을 이용해 가장 작은 시간 구하기
 * 다익스트란 one to all 을 구하는데 단방향(음수간선이 없는) 그래프에서 이상적임
 * 시간복잡도
 * 다익스트라 2번 2MlogN
 */
class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  //요소 추가
  heappush(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  //요소 제거
  heappop() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  //내부메서드 : 요소를 위로 이동
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

  //내부메서드 : 요소를 아래로 이동
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
  .split('\n');
const [N, M, X] = input.split(' ').map(Number);
const graph_go = Array.from({ length: N + 1 }, () => []);
const graph_back = Array.from({ length: N + 1 }, () => []);
for (item of arr) {
  const [A, B, time] = item.split(' ').map(Number);
  graph_go[A].push([time, B]);
  graph_back[B].push([time, A])
}

function dk(start, cost, costs, graph) {
  const hp = new PriorityQueue();
  hp.heappush([cost, start]);
  costs[start] = 0;
  while (!hp.isEmpty()) {
    
    const [p_c, p_s] = hp.heappop();

    if (costs[p_s] < p_c) continue;

    for (const [n_c, n_s] of graph[p_s]) {
      // console.log('n_c, n_s: ', n_c, n_s);
      if (costs[n_s] > n_c + p_c) {
        costs[n_s] = n_c + p_c;
        hp.heappush([costs[n_s], n_s]);
      }
    }
  }
}
const costs_go = Array(N + 1).fill(100000);
const costs_back = Array(N + 1).fill(100000);
dk(X, 0, costs_go, graph_go);
dk(X, 0, costs_back, graph_back);
// console.log(costs);
let max_value = 0;
for (let i = 1; i  < N+1; i++) {
  max_value = Math.max(max_value, costs_go[i] + costs_back[i])
}
console.log(max_value)
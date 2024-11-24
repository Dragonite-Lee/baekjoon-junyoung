// /**
//  * 문제설명
//  * 미로는 N*M 크기이며, 빈방 또는 벽으로 이루어짐, 벽은 부수지않으면 이동할 수 없음
//  * 운영진은 여러명이지만, 한 방에 모두 있어야함.
//  * 운영진이 1,1 에서 N,M으로 이동하기 위해 최소 몇개의 벽을 부수어야하는지
//  * 1은 벽 0은 빈공간임
//  * 아이디어
//  * bfs를 돌건데 공간에서 공간으로 갈땐 가중치를 0 빈공간에서 벽은 가중치 1 벽에서 벽도 가중치1로 두고 큐에 이동?
//  * 힙을 이용해서 움직였을때 힙에 넣을건데 출력값이 가중치가 작은거부터 나오게 이동
//  * visited로 간곳은 안가는선에서 힙을이용
//  * 시간복잡도
//  *
//  */
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

const [M, N] = input.split(' ').map(Number);
// console.log('M, N]: ', M, N);
const graph = [];
for (item of arr) {
  graph.push(item.split('').map(Number));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const visited = Array(N)
  .fill()
  .map(() => Array(M).fill(-1));

function bfs() {
  visited[0][0] = 1;
  const hp = new PriorityQueue();
  hp.heappush([0, 0, 0]);
  while (!hp.isEmpty()) {
    // console.log(hp)
    const [w, y, x] = hp.heappop();
    // console.log('w, y, x: ', w, y, x);
    if (y === N - 1 && x === M - 1) {
      return w;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < M) {
        if (visited[ny][nx] === -1) {
          if (graph[ny][nx] === 1) {
            visited[ny][nx] = w + 1;
            hp.heappush([w + 1, ny, nx]);
          } else {
            visited[ny][nx] = w;
            hp.heappush([w, ny, nx]);
          }
        }
      }
    }
  }
}
console.log(bfs());

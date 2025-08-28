/**
 * 4485 젤다가 누구더라 다익스트라
 * 문제설명
 * 0,0에서 N-1,N-1 로 움직하려하는데 젤 최소로 돈을 잃는 경우를 구하기
 * N=0이 주어지면 입력 종료
 * 아이디어
 * 현재 위치를 힙에 넣고
 * 힙에서 하나씩 뽑고 갈 수 있는 곳을 모두 넣고 N-1N-1에 도달하면 종료 힙엔 코스트기준으로 넣어야함
 * 갱신은 현재 뽑은 cost와 다음칸의 코스트를 더한게 다음칸dist의 값보다 작으면 갱신
 * 시간복잡도
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getMin() {
    return this.heap[0];
  }

  getSize() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);

    return min;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex][0] <= this.heap[index][0]) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  _bubbleDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild][0] < this.heap[smallest][0]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
      ) {
        smallest = rightChild;
      }

      if (smallest === index) {
        break;
      }

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

const fs = require('fs');

const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
let index = 0;
let cnt = 1;
while (true) {
  const N = Number(input[index]);
  if (N === 0) {
    break;
  }
  const graph = [];
  for (let i = index + 1; i < index + N + 1; i++) {
    graph.push(input[i].split(' ').map(Number));
  }

  const hp = new MinHeap();
  hp.insert([graph[0][0], 0, 0]);
  const dist = Array(N)
    .fill()
    .map(() => Array(N).fill(140626));
  dist[0][0] = 0;
  while (hp.getSize() > 0) {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const [cost, y, x] = hp.remove();
    // console.log('cost, y, x: ', cost, y, x);

    if (y === N - 1 && x === N - 1) {
      console.log(`Problem ${cnt}: ${dist[y][x]}`);
      break;
    }
    for (let i = 0; i < 4; i++) {
      const ny = dy[i] + y;
      const nx = dx[i] + x;

      if (0 <= ny && ny < N && 0 <= nx && nx < N) {
        const new_cost = cost + graph[ny][nx];
        // console.log('new_cost: ', new_cost);
        if (new_cost < dist[ny][nx]) {
          dist[ny][nx] = new_cost;
          hp.insert([dist[ny][nx], ny, nx]);
        }
      }
    }
  }

  index += N + 1;
  cnt += 1;
}

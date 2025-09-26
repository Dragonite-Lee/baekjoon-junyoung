/**
 * 문제설명
 * 넥서스가 있는곳으로 달려가려고 한다.
 * 총 N개의 분기점에 위치할 수 있다.
 * 0번째 분기점은 현재 유섭이의 챔피언이 있는 곳, N-1번째 분기점은 상대편 넥서스가 있는 곳
 * 나머지 1 ~ N-2는 중간거점이다.
 * 모든 분기점을 지나갈 수 있는건 아니고, 적 챔피언이나, 적 와드, 미니언, 포탑 등 상대 시야에 걸리곳은 지나칠수없다.
 * 아이디어
 * 최소시간에 음수가 없으니까 다익스트라 알고리즘 사용 ElogV (간선의개수log정점의개수)
 * 시작점은 0 끝점은 N-1
 * 시간복잡도
 *
 */

class MinHeap {
  constructor() {
    this.heap = [];
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
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.split(" ").map(Number);
const sight = arr[0].split(" ").map(Number);
// 0이면 안보임 1이면 보임
const graph = Array.from({ length: N }, () => []);

for (let i = 1; i <= M; i++) {
  const [a, b, t] = arr[i].split(" ").map(Number);
  graph[a].push([t, b]);
  graph[b].push([t, a]);
}

const cost_arr = Array(N).fill(30000000001);
const hp = new MinHeap();
hp.insert([0, 0]);

cost_arr[0] = 0;

while (!hp.isEmpty()) {
  const [cost, start] = hp.remove();
  if (cost_arr[start] !== cost) {
    // 이미지나간곳?
    continue;
  }
  for (const [next_cost, next] of graph[start]) {
    if (cost_arr[next] > next_cost + cost_arr[start]) {
      if (sight[next] === 0 || next === N - 1) {
        //현재값이 작으면 갱신
        cost_arr[next] = next_cost + cost_arr[start];
        hp.insert([cost_arr[next], next]);
      }
    }
  }
}
if (cost_arr[N - 1] === 30000000001) {
  console.log(-1);
} else {
  console.log(cost_arr[N - 1]);
}

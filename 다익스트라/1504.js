/**
 * 1504 특정한 최단 경로
 * 문제설명
 * 방향성이 없는 그래프가 주어짐
 * 세준이는 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 함
 * 임의로 주어진 두 정점을 반드시 통과하며 이동하려함
 * 한번 이동했던 정점은 물론 한번 이동했던 간선도 갈 수 없음
 * 1번에서 가는데 주어진 두 정점 반드시 거치면서 이동하는 프로그램짜기
 * 정점 개수와 간선 개수 주어짐
 * a,b,c 가 주어지는데, a번에서 b번으로 양방향 길 존재 그 거리는 c라는 뜻
 * 마지막에 반드시거치는 정점 번호 주어짐
 * 최단경로길이 출력 없으면 -1 출력
 * 아이디어
 * 1번부터 heap을 만들고 출발
 * cost배열을 만들어서 cost배열보다 현재가 작으면 갱신하고 거기로 출발
 * 여기까진 기본적인 다익스트라?
 * 1부터 N까지 최단거리가 6이고
 * 꼭들려야하는부분부터 N까지 최단거리가 3이면,
 * 1부터 꼭 들려야하는부분까지 최단거리 구하고 거기서 그아이의 최단거리를 더하면 됨
 * 꼭 들려야하는게 2개니까 1 v1 v2 N 과 1 v2 v1 N중 최소값
 * 시간복잡도
 *
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  heappush(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  heappop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (
      this.heap[parentIdx] &&
      this.heap[index][1] < this.heap[parentIdx][1]
    ) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[index][1]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[index][1])
    ) {
      let smallerIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][1] < this.heap[smallerIdx][1]
      ) {
        smallerIdx = rightIdx;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, E] = input.split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const [a, b, c] = arr[i].split(" ").map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

const must_v = arr[E].split(" ").map(Number);

function dijkstra(start, end) {
  if (start === end) {
    return 0;
  }
  const cost = Array(N + 1).fill(800 * 1000 * 3 + 1);
  const heap = new MinHeap();
  heap.heappush([start, 0]);

  while (heap.size() > 0) {
    const [now_d, now_c] = heap.heappop();
    if (cost[now_d] < now_c) {
      continue;
    }

    for (const [next_d, next_c] of graph[now_d]) {
      if (cost[next_d] > next_c + now_c) {
        cost[next_d] = next_c + now_c;

        heap.heappush([next_d, cost[next_d]]);
      }
    }
  }
  return cost[end];
}
const version_1 =
  dijkstra(1, must_v[0]) +
  dijkstra(must_v[0], must_v[1]) +
  dijkstra(must_v[1], N);
const version_2 =
  dijkstra(1, must_v[1]) +
  dijkstra(must_v[1], must_v[0]) +
  dijkstra(must_v[0], N);
const result = Math.min(version_1, version_2);

console.log(result < 800 * 1000 * 3 + 1 ? result : -1);
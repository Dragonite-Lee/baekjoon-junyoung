/**
 * 2109 순회강연
 * 문제설명
 * n개의 대학에서 강연 요청함
 * d일안에 와서 강의해주면 p만큼의 강연료를 지불함
 * d와 p는 대학마다 다를 수 있음
 * 아이디어
 * 힙에서 젤 작은거를 자동으로 추출해주니
 * 젤 큰것만 얻고자하면
 * 매일 힙에 넣고 힙의 개수를 일자로해서 들어있는 개수보다 일자가 길면 빼게끔 제작
 * 시간복잡도
 *
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

      if (this.heap[parentIndex] <= this.heap[index]) {
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
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
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

const n = Number(input);
const graph = [];
const heap = new MinHeap();
for (item of arr) {
  const [p, d] = item.split(" ").map(Number);
  graph.push([p, d]);
}
graph.sort((a, b) => a[1] - b[1]);

// heap에 들어가는 개수가 강연일
for (const [pay, day] of graph) {
  heap.insert(pay);
  if (day < heap.getSize()) {
    // 일수가 작은거대로 삽입하는데 만약 일수보다 더많이 들어가있으면 젤작은거 추출
    heap.remove();
  }
}
const result = heap.heap.reduce((sum, val) => sum + val, 0);
console.log(result);

/**
 * 11000 강의실 배정
 * 문제설명
 * Si에서 시작해서 Ti에 끝나는 N개의 수업이 주어지는데, 최소의 강의실을 사용해 모든 수업을 가능하게 해야함
 * 참고로 수업이 끝난 직후에 다음 수업을 시작할 수 있음
 * 강의실개수출력
 * 아이디어
 * N은 200,000
 * 이중포믄은 안됨
 * 기준을정해서 for문 한번으로 해결해야함
 * 최소힙이용??
 * 회의가 끝나는시간이 있는데 시작시간보다 크면 새 회의실 잡아야하고,
 * 시작시간보다 작거나 같으면 있는 회의실 이용
 * 힙에서
 * 시간복잡도
 *
 */

class MinHeap {
  constructor() {
    this.heap = [null]; // 첫 번째 인덱스는 사용하지 않음
  }

  getMin() {
    return this.heap[1]; // 루트 노드
  }

  getSize() {
    return this.heap.length - 1;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  insert(value) {
    this.heap.push(value); // 값 추가
    let current = this.heap.length - 1;

    // 부모와 비교하며 최소 힙 조건을 만족하도록 재배치
    while (current > 1) {
      const parent = Math.floor(current / 2);
      if (this.heap[parent] > this.heap[current]) {
        [this.heap[parent], this.heap[current]] = [
          this.heap[current],
          this.heap[parent],
        ];
        current = parent;
      } else break;
    }
  }

  remove() {
    if (this.isEmpty()) return null;
    const min = this.heap[1]; // 루트 노드 저장
    this.heap[1] = this.heap.pop(); // 마지막 노드를 루트로 이동

    let current = 1;
    let leftChild = current * 2;
    let rightChild = current * 2 + 1;

    // 최소 힙 조건을 만족하도록 재배치
    while (this.heap[leftChild] !== undefined) {
      let smallerChild = leftChild;
      if (
        this.heap[rightChild] !== undefined &&
        this.heap[rightChild] < this.heap[leftChild]
      ) {
        smallerChild = rightChild;
      }

      if (this.heap[current] > this.heap[smallerChild]) {
        [this.heap[current], this.heap[smallerChild]] = [
          this.heap[smallerChild],
          this.heap[current],
        ];
        current = smallerChild;
        leftChild = current * 2;
        rightChild = current * 2 + 1;
      } else break;
    }

    return min;
  }
}

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const num_arr = [];
for (item of arr) {
  num_arr.push(item.split(" ").map(Number));
}
num_arr.sort((a, b) => a[0] - b[0]);
// console.log('num_arr: ', num_arr);
const heap = new MinHeap();
heap.insert(num_arr[0][1]); //회의가 끝나는 시간을 넣음

for (let i = 1; i < N; i++) {
  if (num_arr[i][0] >= heap.getMin()) {
    // 현재회의의 시작시간이 전회의의 끝나는시간보다 큼 -> 회의실추가안해도됨
    heap.remove();
    heap.insert(num_arr[i][1]); // 새롭게 끝나는 회의시간으로 갱신
  } else {
    // 회의실 갱신해야 함
    heap.insert(num_arr[i][1]);
  }
}

console.log(heap.getSize());

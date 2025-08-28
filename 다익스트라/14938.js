/**
 * 14938 서강그라운드
 * 하나지역에 낙하해 그 지역에 있는 아이템을 이용해 서바이벌하는 게임
 * 걱 자욕애 어아템이 몇개있는진 아는데 어디로 낙하해야 하는지 자신의 수색범위내에서 가장 많이 먹을수있는지 모름
 * 각 지역은 일정한 길이 l의 길로 연결되어 있고 양방향 통행 가능!!!!
 * 낙하지역부터 거리가 수색범위 m 이내의 모든지역의 아이템 습득가능할때 최대 개수
 * 아이디어 n m r 지역개수 수색범위 길의개수
 * n개의 숫자로 각 아이템 수
 * 시작값을 넣으면 dq에 넣어서 탐색시작
 * 대신 dq에 다음목표값과 남은 거리를 넣음
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
      const cnt = this.arr[this.head++];
      this.length--;
      return cnt;
    }
  }
  pop() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const cnt = this.arr[--this.tail];
      this.length--;
      return cnt;
    }
  }
}
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m, r] = input.split(' ').map(Number);
const item_cnt = arr[0].split(' ').map(Number);

const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < 1 + r; i++) {
  const [st, en, dis] = arr[i].split(' ').map(Number);
  graph[st].push([en, dis]);
  graph[en].push([st, dis]);
}

function search(start, dist) {
  // console.log("start, dist: ", start, dist);
  const aaa = Array(n + 1).fill(1000000);

  aaa[start] = 0;

  const hp = new MinHeap();
  hp.insert([0, start]);

  while (hp.getSize() > 0) {
    const [p_d, p_s] = hp.remove();
    // console.log('p_d, p_s: ', p_d, p_s);

    if (p_d !== aaa[p_s]) {
      continue;
    }
    for (const [n_s, n_d] of graph[p_s]) {
      if (aaa[n_s] >= aaa[p_s] + n_d) {
        // 지금까지 쓴 수색범위랑 다음 범위
        aaa[n_s] = aaa[p_s] + n_d;
        hp.insert([aaa[n_s], n_s]);
      }
    }
  }

  return aaa;
}
let result = 0;
for (let i = 1; i < n + 1; i++) {
  const aa = search(i, m)
  let cnt = 0;
  for (let j = 1; j < n+1;j++) {
    if (aa[j] <= m) {
      cnt+= item_cnt[j-1]
    }
  }
  result = Math.max(result, cnt)
}
console.log(result);

// 23

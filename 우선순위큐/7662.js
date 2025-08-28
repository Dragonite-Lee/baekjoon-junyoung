class DualPriorityQueue {
  constructor() {
    this.minHeap = [];
    this.maxHeap = new Map();
  }

  insert(value) {
    this.minHeap.push(value);
    this.maxHeap.set(value, (this.maxHeap.get(value) || 0) + 1);
  }

  removeMax() {
    while (this.minHeap.length) {
      const maxVal = Math.max(...this.minHeap);
      if (this.maxHeap.has(maxVal) && this.maxHeap.get(maxVal) > 0) {
        this.maxHeap.set(maxVal, this.maxHeap.get(maxVal) - 1);
        if (this.maxHeap.get(maxVal) === 0) this.maxHeap.delete(maxVal);
        this.minHeap.splice(this.minHeap.indexOf(maxVal), 1);
        return;
      }
    }
  }

  removeMin() {
    while (this.minHeap.length) {
      const minVal = Math.min(...this.minHeap);
      if (this.maxHeap.has(minVal) && this.maxHeap.get(minVal) > 0) {
        this.maxHeap.set(minVal, this.maxHeap.get(minVal) - 1);
        if (this.maxHeap.get(minVal) === 0) this.maxHeap.delete(minVal);
        this.minHeap.splice(this.minHeap.indexOf(minVal), 1);
        return;
      }
    }
  }

  getMin() {
    return this.minHeap.length ? Math.min(...this.minHeap) : 'EMPTY';
  }

  getMax() {
    return this.minHeap.length ? Math.max(...this.minHeap) : 'EMPTY';
  }
}

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');

const T = Number(input[0]);
let index = 1;

for (let t = 0; t < T; t++) {
  const k = Number(input[index]);
  const queue = new DualPriorityQueue();

  for (let i = 0; i < k; i++) {
    const [cmd, num] = input[index + 1 + i].split(' ');
    if (cmd === 'I') queue.insert(Number(num));
    else if (cmd === 'D' && num === '1') queue.removeMax();
    else if (cmd === 'D' && num === '-1') queue.removeMin();
  }

  if (queue.getMax() !== 'EMPTY' && queue.getMin() !== 'EMPTY') {
    console.log(queue.getMax(), queue.getMin());
  } else {
    console.log('EMPTY');
  }

  index += k + 1;
}

/**
 * 문제설명
 * 왕은 자손을 남기지 않고 사망해서 왕위를 계승할 사람을 지목하지 못했다.
 * 그래서 나라를 세운 사람과 혈통이 가까운 사람이 유토피아를 통치한다는 조항이 있다.
 * 혈통이 가장 가까운 사람은 그의 자손이 아닌 사람과 피가 덜 섞인 사람
 * 모든 사람은 아버지와 어머니의 혈통을 반반씩 받음
 * 나라를 세운 사람의 자식은 1/2 왕족이며, 그 아들이 왕족이 아닌 사람과 결혼한 경우 아들의 자식은 1/4 왕족이 된다.
 * 가장 가까운사람을 찾아라
 *
 * 아이디어
 * 둘째줄에 유토피아 세운 사람의 이름이 주어지고,
 * N개의 줄에 가족정보 주어지는데, 첫번째가 자식, 뒤가 부모
 * M개의 줄에 왕위를 계승받기를 주장하는 사람이 한줄에 하니씩 주어진다.
 * 위상정렬이란? 일의 순서가 정해져있는 작업을 하기 위한 정렬을 뜻함 + 시작점이 존재해야함
 * 시작점은 "나라를 세운사람"
 * 또한, map을 이용해 해당 키값의 부모와 혈중농도수를 정함
 * 시간복잡도
 *
 */
class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  push(item) {
    this.arr[this.tail++] = item;
    this.length++;
  }
  popleft() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      this.length--;
      return result;
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
const first = arr[0];

const inDegree = new Map();
const family = new Map();

/**
 * [0,0] 은 [부모수, 혈중 왕족의 농도]
 */
inDegree.set(first, [0, 1]);

for (let i = 1; i <= N; i++) {
  const [a, b, c] = arr[i].split(" ");

  if (!inDegree.has(b)) {
    inDegree.set(b, [0, 0]);
  }

  if (!inDegree.has(c)) {
    inDegree.set(c, [0, 0]);
  }

  inDegree.set(a, [2, 0]);
  if (!family.has(b)) {
    family.set(b, []);
  }
  if (!family.has(c)) {
    family.set(c, []);
  }

  family.get(b).push(a);
  family.get(c).push(a);
}

const dq = new Deque();
inDegree.forEach((value, key) => {
  if (value[0] === 0) {
    dq.push(key);
  }
});

while (dq.length > 0) {
  const parent = dq.popleft();
  const children = family.get(parent);

  if (children !== undefined) {
    for (const child of children) {
      inDegree.get(child)[1] += inDegree.get(parent)[1];
      inDegree.get(child)[0] -= 1;
      if (inDegree.get(child)[0] === 0) {
        dq.push(child);
        if (inDegree.get(child)[1] !== 0) {
          inDegree.get(child)[1] /= 2;
        }
      }
    }
  }
}

let max = -1;
let result = "";
for (let i = N + 1; i <= N + M; i++) {
  const candid = arr[i];

  const candidate = inDegree.get(candid);
  const blood = candidate ? candidate[1] : 0;
  if (blood > max) {
    max = blood;
    result = candid;
  }
}

console.log(result);

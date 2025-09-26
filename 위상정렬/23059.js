/**
 * 문제설명
 * 레벨을 올려서 증가에 따른 능력치를 얻거나, (레벨에 대한 일정 상한선이 존재)
 * 골드를 사용하여 아이템들을 구매함으로 자신의 능력치를 높임
 * 아이템에는 미리 정해진 순서가 존재한다.  선후관계만 알고있음
 * 현재 구매할 수 있는 아이템 중 아직 구매하지않은 아이템을 모두 찾는다.
 * 찾은 아이템을 사전 순으로 구매한다.
 * 아이템 A,B가 주어지는 A는 B를 구매하기위해 먼저구매해야함
 * 모든 아이템을 구매할 수 없으면 -1
 * 아이디어
 * 순서가 정해져있으니 위상정렬이 맞음
 * 갈수있는 길을 만들고
 * 진입차수를 이용하자
 * 진입차수가 0임을 활용
 * 진입차수를 다넣고 진입차수가 현재같아서 동일타이밍에 들어간애들은 사전순 정렬해야함 그러면 넣을때 표시를넣고 정렬?
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
const [input, ...lines] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const E = Number(input);
const edges = [];
const nodes = new Set();
for (let i = 0; i < lines.length; i++) {
  const [u, v] = lines[i].trim().split(/\s+/);
  edges.push([u, v]);
  nodes.add(u);
  nodes.add(v);
}

// 그래프/진입차수
const adj = new Map();
const indeg = new Map();
for (const x of nodes) {
  adj.set(x, []);
  indeg.set(x, 0);
}
for (const [u, v] of edges) {
  adj.get(u).push(v);
  indeg.set(v, indeg.get(v) + 1);
}

// 초기 라운드
const collator = new Intl.Collator("ko"); // 필요없으면 제거 가능
let curr = [];
for (const x of nodes) if (indeg.get(x) === 0) curr.push(x);
curr.sort(collator.compare);

const out = [];
let processed = 0;

while (curr.length) {
  const next = [];
  for (const u of curr) {
    out.push(u);
    processed++;
    for (const v of adj.get(u)) {
      indeg.set(v, indeg.get(v) - 1);
      if (indeg.get(v) === 0) next.push(v);
    }
  }
  next.sort(collator.compare);
  curr = next;
}

if (processed !== nodes.size) {
  console.log(-1);
} else {
  console.log(out.join("\n"));
}

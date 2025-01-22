/**
 * 7569 토마토 3차원 bfs
 * 문제설명
 * 익은 토마토 옆에 있으면 익게 된다. 다 익는 최소일자를 계산하자
 * -1은 빈칸 0은 익지않은 토마토 1은 익은 토마토
 * 아이디어
 * 3차원 bfs임
 * 2차원이랑 똑같이하지만 배열을 하나더 만들거나 높이가 1차인덱스로 오게끔 구현
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
      const result = this.arr[this.head++];
      this.length--;
      return result;
    }
  }
  pop() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
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

const [M, N, H] = input.split(" ").map(Number);

const graph = Array.from({ length: H }, () => []);

for (let i = 0; i < H; i++) {
  for (let j = i * N; j < (i + 1) * N; j++) {
    graph[i].push(arr[j].split(" ").map(Number));
  }
}

const visited = Array(H)
  .fill()
  .map(() =>
    Array(N)
      .fill()
      .map(() => Array(M).fill(false))
  );

const qu = new Deque();
let zero_cnt = 0;
let ok_cnt = 0;
for (let h = 0; h < H; h++) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (graph[h][y][x] === 1) {
        qu.push([h, y, x]);
        visited[h][y][x] = true;
      } else if (graph[h][y][x] === 0) {
        zero_cnt += 1;
      }
    }
  }
}

let qu_length = qu.length;
let result = 0;

if (qu.length > 0 && zero_cnt === 0) {
  // 처음부터 다 익어있는 상태
  console.log(0);
} else {
  dh = [1, -1, 0, 0, 0, 0];
  dy = [0, 0, 1, 0, -1, 0];
  dx = [0, 0, 0, 1, 0, -1];

  while (qu.length > 0) {
    const [eh, ey, ex] = qu.popleft();

    for (let i = 0; i < 6; i++) {
      const nh = eh + dh[i];
      const ny = ey + dy[i];
      const nx = ex + dx[i];

      if (0 <= nh && nh < H && 0 <= ny && ny < N && 0 <= nx && nx < M) {
        if (visited[nh][ny][nx] === false && graph[nh][ny][nx] === 0) {
          qu.push([nh, ny, nx]);
          visited[nh][ny][nx] = true;
        }
      }
    }
    ok_cnt += 1;
    if (ok_cnt === qu_length) {
      result += 1;
      qu_length = qu.length;
      ok_cnt = 0;
    }
  }
  let ok = true;
  for (let h = 0; h < H; h++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (visited[h][y][x] === false && graph[h][y][x] !== -1) {
          console.log(-1);
          ok = false;
          break;
        }
      }
      if (!ok) {
        break;
      }
    }
    if (!ok) {
      break;
    }
  }
  if (ok) {
    console.log(result - 1); //result가 더해지기전에 다익고 1이더해지므로 1빼줌
  }
}

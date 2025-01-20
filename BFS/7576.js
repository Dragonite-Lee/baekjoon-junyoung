/**
 * 문제설명
 * 가로 M 세로 N인 박스안에 토마토가 존재
 * 익은 토마토 옆에 있는 안익은 토마토는 하루가 지나면 익음
 * 1은 익은 토마토 0은 익지 않은 토마토 -1은 빈칸임
 * 시작부터 다 익어있으면 0 출력, 모두 익지 못하면 -1 출력
 * 전체가 익는 최소일자 출력
 * 아이디어
 * 2 <= N,M <= 1000
 * 반복문 한번 돌아서 현재 익은 사과의 위치를 dq에 넣음 이때, 0의 갯수 세기
 * 만약 dq가 존재하고, 0의 수가 하나도 없으면 0출력
 * dq가 존재하면 while문 돌림
 * dq에서 꺼내서 상하좌우 움직이고 안익은 사과 + 처음가는 위치면 dq에 넣음
 * dq_length를 세서 들어가고 한번돌면 ok_cnt를 늘리고 만약이게 dq_length와 같으면 dq에 요소 넣고 새롭게 dq_length를 바꿈 그리고 ok를 true로 변경
 * ok가 true면 false로 바꾸고 result증가
 * 다 끝나면 이중포문돌려서 0존재하면 -1 아니면 while반복한 횟수 출력
 * 시간복잡도
 * O(N)
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

const [M, N] = input.split(" ").map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split(" ").map(Number));
}

const visited = Array(N)
  .fill()
  .map(() => Array(M).fill(false));
let dq = new Deque();
let zero_cnt = 0;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (graph[y][x] === 1) {
      dq.push([y, x]);
      visited[y][x] = true;
    } else if (graph[y][x] === 0) {
      zero_cnt += 1;
    }
  }
}

if (dq.length > 0 && zero_cnt === 0) {
  console.log(0);
} else {
  let result = 0;

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  let dq_length = dq.length;
  let ok_cnt = 0;
  while (dq.length > 0) {
    const [ey, ex] = dq.popleft();
    // console.log("ey, ex: ", ey, ex);
    // console.log("result", result, "dq_length", dq_length);
    for (let i = 0; i < 4; i++) {
      const ny = ey + dy[i];
      const nx = ex + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < M) {
        if (graph[ny][nx] === 0 && visited[ny][nx] === false) {
          visited[ny][nx] = true;
          dq.push([ny, nx]);
        }
      }
    }
    ok_cnt += 1;
    if (ok_cnt === dq_length) {
      ok_cnt = 0;
      result += 1;
      dq_length = dq.length;
    }

    // console.log(ey, ex)
    // console.log(visited)
  }

  let not = false;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (visited[y][x] === false && graph[y][x] !== -1) {
        not = true;
        break;
      }
    }
    if (not) {
      break;
    }
  }
  if (not) {
    console.log(-1);
  } else {
    console.log(result - 1);
  }
}
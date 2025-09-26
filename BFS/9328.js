/**
 * 문제설명
 * 평면도에 문서의 위치가 있다. 문을 열려면 열쇠가 필요한데, 일부는 가지고있고 일부는 바닥에 떨어져잇다.
 * 훔칠수있는 최대 문서의 개수
 * . 는 빈공간
 * * 벽
 * $ 훔쳐야 하는 문서
 * 대문자는 문
 * 소문자는 열쇠 -> 대문자인 문을 열수있음
 * 마지막줄엔 가지고있는 열쇠 혹은 없으면 '0'
 * 벽이아닌 가장자리를 통해 드나들 수 있다.
 * 아이디어
 *
 * 시간복잡도
 */
class Deque {
  constructor() {
    this.arr = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }
  push(value) {
    this.arr[this.tail++] = value;
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
const T = Number(input);
let cc = 0;
let index = 0;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

while (cc < T) {
  cc++;
  let result = 0;
  const [Y, X] = arr[index].split(" ").map(Number);
  index++;
  const graph = [];
  for (let i = 0; i < Y; i++) {
    graph.push(arr[index + i].split(""));
  }
  index += Y;

  const key = arr[index].split("");
  index++;

  function bfs(y, x) {
    console.log("y, x: ", y, x);
    const dq = new Deque();
    visited[y][x] = true;
    dq.push([y, x]);

    while (dq.length > 0) {
      const [py, px] = dq.popleft();
      console.log("py, px: ", py, px);

      for (let i = 0; i < 4; i++) {
        const ny = py + dy[i];
        const nx = px + dx[i];

        if (0 <= ny && ny < Y && 0 <= nx && nx < X) {
          if (visited[ny][nx] === false && graph[ny][nx] !== "*") {
            console.log(graph[ny][nx]);
            const askii = graph[ny][nx].charCodeAt();
            // 알파벳 소문자 97 ~ 122 대문자 65 ~ 90
            if (askii >= 97 && askii <= 122) {
              // 열쇠를 먹음
              key.push(graph[ny][nx]);

              dq.push([ny, nx]);
              visited[ny][nx] = true;

              if (room.has(String.fromCharCode(askii - 32))) {
                dq.push(room.get(String.fromCharCode(askii - 32)));
                console.log(
                  "room.get(String.fromCharCode(askii - 32)): ",
                  room.get(String.fromCharCode(askii - 32))
                );
              }
            } else if (askii >= 65 && askii <= 90) {
              // 방을 발견함
              if (key.includes(String.fromCharCode(askii + 32))) {
                dq.push([ny, nx]);
                visited[ny][nx] = true;
              } else {
                if (room.has(graph[y][x])) {
                  room.get(graph[y][x]).push([y, x]);
                } else {
                  room.set(graph[y][x], [[y, x]]);
                }
              }
            } else if (graph[ny][nx] === "$") {
              // 문서 발견
              visited[ny][nx] = true;
              result += 1;
              dq.push([ny, nx]);
            } else {
              visited[ny][nx] = true;
              dq.push([ny, nx]);
            }
          }
        }
      }
    }
  }

  const room = new Map();

  const visited = Array(Y)
    .fill()
    .map(() => Array(X).fill(false));

  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      // 가장자리만 검사
      if (y === 0 || y === Y - 1 || x === 0 || x === X - 1) {
        if (visited[y][x] === false && graph[y][x] !== "*") {
          const askii = graph[y][x].charCodeAt();
          // 알파벳 소문자 97 ~ 122 대문자 65 ~ 90
          if (askii >= 97 && askii <= 122) {
            // 열쇠를 먹음
            key.push(graph[y][x]);
            bfs(y, x);
          } else if (askii >= 65 && askii <= 90) {
            // 방을 발견함
            if (room.has(graph[y][x])) {
              room.get(graph[y][x]).push([y, x]);
            } else {
              room.set(graph[y][x], [[y, x]]);
            }
            if (key.includes(graph[y][x])) {
              bfs(y, x);
            }
          } else if (graph[y][x] === "$") {
            // 문서 발견
            result += 1;
            bfs(y, x);
          } else {
            bfs(y, x);
          }
        }
      }
    }
  }

  console.log(result);
  break;
  //키를 가지고 있는 방부터 돌기
  //   for (ro of room) {
  //   }
}

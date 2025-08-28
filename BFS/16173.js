/**
 * 문제설명
 * 점프를 하는데 조건이 있음
 * 1. 가로와 세로의 칸 수가 같은 정사각형의 구역 내부에서만 움직일 수 있음 -> 나가면 즉시 패배
 * 2. 출발점은 항상 정사각형 가장 왼쪽 위 칸
 * 3. 이동가능한 방향은 오른쪽, 아래 두 방향
 * 4. 가장 오른쪽, 가장 아래칸에 도달하면 승리로 게임 종료
 * 5. 한번에 이동할 수 있는 칸은 현재 밝고 있는 칸의 수만큼. 초과나 미만은 금지
 * 승리할수있는지 확인하기.
 *
 * 아이디어
 * BFS에 적합한 문제라고 생각
 * 너비우선탐색으로 풀건데, 디큐를 이용해서 갈수있는 범위를 다 넣고, 이동하면서 목적지면 true 반환
 *
 * 시간 복잡도
 * BFS는 O(V+E)인데, N이 2 ~ 3이므로 V가 최대 9, E가 최대 24정도 될듯
 */
class Deque {
  constructor() {
    this.arr = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
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
const map = [];
const N = Number(input);
for (let i = 0; i < N; i++) {
  map.push(arr[i].split(" ").map(Number));
}

const visited = Array(N)
  .fill()
  .map(() => Array(N).fill(false));

function bfs(y, x) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  const dq = new Deque();
  visited[y][x] = true;
  dq.push([y, x]);

  while (dq.length > 0) {
    const [py, px] = dq.popleft();
    for (let i = 0; i < 4; i++) {
      const ny = py + dy[i] * map[py][px];
      const nx = px + dx[i] * map[py][px];

      if (0 <= ny && ny < N && 0 <= nx && nx < N) {
        if (visited[ny][nx] === false) {
          if (ny === N - 1 && nx === N - 1) {
            return "HaruHaru";
          }
          visited[ny][nx] = true;
          dq.push([ny, nx]);
        }
      }
    }
  }
  return "Hing";
}

console.log(bfs(0, 0));

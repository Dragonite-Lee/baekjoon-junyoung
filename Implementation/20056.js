/**
 * 문제설명
 * 어른상어가 마법사가 되었고 파이어볼을 배웠다.
 * N*N인 격자에 파이어볼 M개를 발사한다.
 * i번째 파이어볼은 ri ci이고 질량은 mi 방향은 di 속력은 si이다
 *
 * 파이어볼에게 명령을하면 자신의 방향 di로 속력 si칸만큼 이동한다.
 * 이동이 끝난뒤 2개 이상의 파이어볼이 한 칸에 있으면 안되므로,
 * 같은칸에 있는 파이어볼은 하나로 합쳐진다.
 * 파이어볼은 4개의 파이어볼로 나누어지는데,
 * 1. 합쳐진 질량의 합 / 5
 * 2. 합쳐질 파이어볼 속력 / 합쳐진 개수
 * 3. 합쳐지는 방향이 모두 홀수이거나 짝수면 방향은 0,2,4,6 아니면 1,3,5,7
 * 4. 질량이 0인 파이어볼은 소멸되어 없어진다.
 * 아이디어
 * 파이어볼을 배치시킨다음 2개이상인건 합쳐서 4개로 분해시켜야함
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

const [N, M, K] = input.split(" ").map(Number);
const dq = new Deque();

for (item of arr) {
  const [r, c, m, s, d] = item.split(" ").map(Number);
  dq.push([r, c, m, s, d]);
}

const dc = [0, 1, 1, 1, 0, -1, -1, -1];
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const direction_arr = [
  [0, 2, 4, 6],
  [1, 3, 5, 7],
];

let index = 0;
let result = 0;

while (index < K) {
  result = 0;
  //   console.log(dq);
  const graph = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => [])
  );
  while (dq.length > 0) {
    const [pr, pc, pm, ps, pd] = dq.popleft();
    // console.log('pr, pc, pm, ps, pd: ', pr, pc, pm, ps, pd);

    const nr =
      (pr + dr[pd] * ps) % N > 0
        ? (pr + dr[pd] * ps) % N
        : ((pr + dr[pd] * ps) % N) + N;
    const nc =
      (pc + dc[pd] * ps) % N > 0
        ? (pc + dc[pd] * ps) % N
        : ((pc + dc[pd] * ps) % N) + N;
    graph[nr][nc].push([pm, ps, pd]);
  }

  for (let y = 1; y < N + 1; y++) {
    for (let x = 1; x < N + 1; x++) {
      if (graph[y][x].length === 0) {
        continue;
      } else if (graph[y][x].length === 1) {
        const [m, s, d] = graph[y][x][0];
        dq.push([y, x, m, s, d]);
        result += m;
      } else {
        let sm = 0;
        let ss = 0;
        let sd = null;
        let direction = -1;
        let count = 0;
        for (item of graph[y][x]) {
          const [m, s, d] = item;
          sm += m;
          ss += s;
          count += 1;
          if (sd === null) {
            //짝수
            if (d % 2 === 0) {
              sd = true;
            } else {
              sd = false;
            }
          } else {
            if (sd === true) {
              if (d % 2 === 0) {
                sd = true;
              } else {
                sd = false;
                direction = 1;
              }
            } else {
              if (d % 2 === 0) {
                sd = true;
                direction = 1;
              } else {
                sd = false;
              }
            }
          }
        }
        if (direction === -1) {
          direction = 0;
        }

        sm = Math.floor(sm / 5);

        ss = Math.floor(ss / count);
        if (sm !== 0) {
          for (const direc of direction_arr[direction]) {
            result += sm;
            dq.push([y, x, sm, ss, direc]);
          }
        }
      }
    }
  }
  //   console.log(graph);
  index += 1;
}
console.log(result);

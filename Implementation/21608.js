/**
 * 문제설명
 * 상어초에 교실이있음 N*N 격자로 나타내는데 학생수는 N^2명임 1 ~ N^2번까지 번호 매겨져 있다.
 * 선생님은 학생의 순서를 정했고, 각 학생이 좋아하는 학생 4명도 조사했다. 이제 자리를 정하려고함
 * 한칸에는 학생 한명이 앉고, r1 - r2 c1 - c2 의 절대값의 합이 1을 만족하는 두칸이 인접하다고할때 -> 상하좌우
 * 1. 비어있느 칸 중 좋아하는 학생이 인접한 칸에 가장 많은 칸으로 자리를 정함
 * 1을 만족하는 칸이 여러개면 인접칸중 비어있는 칸이 가장 많은 칸으로 자리 정함
 * 2를 만족하느 칸도 여러개면 행의 번호가 가장 작은 칸, 이것도 여러개면 열이 가장 작은 칸
 * 아이디어
 * 1. 인접한 사람이 가장 많은거 넣고 비어잇는 칸 많은 곳에 넣기 그거아니면 y 작은거 x작은거
 * 2. 위에서 여러개 나오면
 * 시간복잡도
 *
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

const N = Number(input);
const dq = new Deque();
const list = [];
const listmap = new Map();
for (item of arr) {
  const [person, a, b, c, d] = item.split(" ").map(Number);
  listmap.set(person, [a, b, c, d]);
  list.push([person, [a, b, c, d]]);
}

const graph = Array(N)
  .fill()
  .map(() => Array(N).fill(0));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let item of list) {
  const [person, like_arr] = item;
  //   console.log("like_arr: ", like_arr);
  //   console.log("person: ", person);
  let like_total = -1;
  let vacant_total = -1;
  let which = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let max_like = 0;
      let max_vacant = 0;
      if (graph[y][x] === 0) {
        //일단 비어잇는경우에서 탐색하면서 최대값찾기
        for (let i = 0; i < 4; i++) {
          const ny = y + dy[i];
          const nx = x + dx[i];

          if (0 <= ny && ny < N && 0 <= nx && nx < N) {
            if (like_arr.includes(graph[ny][nx])) {
              max_like += 1;
            } else if (graph[ny][nx] === 0) {
              max_vacant += 1;
            }
          }
        }
        // console.log(y, x);
        // console.log("like_total", like_total);
        // console.log("max_like: ", max_like);
        // console.log("vacant_total: ", vacant_total);
        // console.log("max_vacant: ", max_vacant);
        // console.log("which: ", which);
        if (like_total < max_like) {
          which = [y, x];
          like_total = max_like;
          vacant_total = max_vacant;
        } else if (like_total === max_like) {
          // 친구수 다음엔 비어있는 수
          if (vacant_total < max_vacant) {
            which = [y, x];
            // like_total = max_like;
            vacant_total = max_vacant;
          } else if (vacant_total === max_vacant) {
            const [px, py] = which;
            if (y < py) {
              which = [y, x];
            //   like_total = max_like;
            //   vacant_total = max_vacant;
            } else if (y === py) {
              if (x < px) {
                which = [y, x];
                // like_total = max_like;
                // vacant_total = max_vacant;
              }
            }
          }
        }
      }
    }
  }
  if (graph[which[0]][which[1]] === 0) {
    graph[which[0]][which[1]] = person;
  }
}
// console.log(graph);
// 이 0이면 학생의 만족도는 0, 1이면 1, 2이면 10, 3이면 100, 4이면 1000이다.
function sum_count(value) {
  if (value === 0) {
    return 0;
  } else if (value === 1) {
    return 1;
  } else if (value === 2) {
    return 10;
  } else if (value === 3) {
    return 100;
  } else {
    return 1000;
  }
}
let result = 0;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (0 <= ny && ny < N && 0 <= nx && nx < N) {
        if (listmap.get(graph[y][x]).includes(graph[ny][nx])) {
          count += 1;
        }
      }
    }
    result += sum_count(count);
  }
}
console.log(result);

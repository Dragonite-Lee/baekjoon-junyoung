/**
 * 문제설명
 * 평면위에 로봇이 있는데, N번 행동을 취한다.
 * 각 행동에서 로봇은 4개의 방향 중에 하나를 임의로 선택한다. 그리고 그 방향으로 한칸 이동
 * 같은곳을 한번보다 많이 이동하지 않을때 단순하다고함 즉 방문한곳 또가면안됨
 * 절대/상대 오차는 10-9  단순할 확률 구함
 * 아이디어
 * dfs로 모든 경우의 수를 탐색
 * 방문한곳이나오면 각확률들 더해서 1에서 빼기
 * 시간복잡도
 *
 */
const fs = require("fs");
const arr = fs.readFileSync("./input.txt").toString().trim().split("\n");

const [action, a, b, c, d] = arr[0].split(" ").map(Number);
// console.log("action: ", action);
const direction = [a, b, c, d];
// console.log("direction: ", direction);
let result = 0;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const visited = Array(30)
  .fill()
  .map(() => Array(30).fill(false));

function dfs(deps, y, x, opa) {
  if (deps === action) {
    result += opa;
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (direction[i] === 0) {
      continue;
    }
    // 0은 E, 1은 W, 2는 S, 3은 N
    const ny = dy[i] + y;
    const nx = dx[i] + x;

    if (0 <= ny && ny < 30 && 0 <= nx && nx < 30) {
      if (visited[ny][nx] === false) {
        visited[ny][nx] = true;
        const next = direction[i] / 100;
        // console.log("next: ", next);

        dfs(deps + 1, ny, nx, opa * next);
        visited[ny][nx] = false;
      }
    }
  }
}
visited[15][15] = true;
dfs(0, 15, 15, 1);


console.log(result.toFixed(9));
// const formatted = simpleProb.toFixed(9).replace(/0+$/, "").replace(/\.$/, "");
// console.log(formatted);

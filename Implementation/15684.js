/**
 * 문제설명
 * N개의 세로선과 M개읙 가로선이 있다. 인접한 세로선 사인 가로선을 놓을 수 있는데 각각의 세로선마다 가로선 놓는 위치의 수는 H
 * 모든 세로선이 같은 위치를 갖는다. 가로선이 연속하거나 서로접하면 안된다.
 * 사다리를 조작해 i세로선이 i가 나오게 하려고 함
 * 정답이 3보다 크면 -1 불가능도 -1
 * 아이디어
 * graph에 b나 b+1이 서로한테 가는걸 사다라와 함께 체크
 * 애초에 각각 독립적으로 움직임
 * 즉 1번이 1번으로 가려면 놓아야하는 수 2번 2번더하다가 3을넘어가면 -1 출력하고 끝
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M, H] = input.split(' ').map(Number); // 세로선 가로선 위치의 개수
const visited = Array(H)
  .fill()
  .map(() => Array(N).fill(0));
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i].split(' ').map(Number);
  visited[a - 1][b - 1] = 1;
  // b번과 b+1번을 a번 위치로 연결
}

function check() {
  for (let i = 0; i < N; i++) {
    // 현재 사다리 번호
    let start_num = i;
    for (let j = 0; j < H; j++) {
      if (visited[j][start_num] === 1) {
        start_num++;
      } else if (start_num > 0 && visited[j][start_num - 1] === 1) {
        start_num--;
      }
    }
    if (start_num !== i) {
      return false;
    }
  }
  return true;
}

let result = 4;
function dfs(cnt, deps) {
  if (result <= cnt) {
    return;
  }
  if (check()) {
    result = Math.min(cnt, result);
    return;
  }
  if (cnt === 3) {
    return;
  }

  for (let i = deps; i < H; i++) {
    for (let j = 0; j < N - 1; j++) {
      if (visited[i][j] === 0) {
        visited[i][j] = 1;
        dfs(cnt + 1, i);
        visited[i][j] = 0;
      }
    }
  }
}

dfs(0, 0);
if (result === 4) {
  console.log(-1);
} else {
  console.log(result);
}

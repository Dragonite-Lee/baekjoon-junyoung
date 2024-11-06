/**
 * 문제설명
 * 1부터 9까지의 숫자와 구멍이 있는 보드에서 게임함
 * 왼쪽 위에 동전 올려놓고, 동전이 있는곳에 쓰여있는 숫자 x를 봄
 * 위,아래,왼쪽,오른쪽중 하나 고르고
 * 이동함 중간에있는 구멍은 무시
 * 만약 동전이 구멍에서 빠지거나 보드 바깥으로 나가면 게임 종료 되도록 오래하려고함 최대 몇번 움직일 수 있는지 구하기
 * N*M크기에 50보다 작거나 같은 자연수,
 * 아이디어
 * dfs이용
 * dp로 숫자를 세는데 현재 dp값보다 작거나 같을땐 접근안함
 * 또한 visited배열을 두고 true면 순회이므로 끝냄 process.exit(console.log(-1))
 * 위의 2개가 아니라면 answer갱신하고 dfs백트래킹
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.split(' ').map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split(''));
}
let dp = Array.from(Array(N), () => Array(M).fill(-1));
dp[0][0] = 1;

let visited = Array.from(Array(N), () => Array(M).fill(false));
visited[0][0] = true;
let answer = 1;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function dfs(y, x, visited) {
  // console.log(y,x,visited)
  const cnt = dp[y][x];
  const value = graph[y][x];

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i] * value;
    const nx = x + dx[i] * value;
    // console.log(ny,nx)
    if (0 > ny || ny >= N || 0 > nx || nx >= M || graph[ny][nx] === 'H') {
      continue;
    }

    if (visited[ny][nx]) {
      process.exit(console.log(-1));
    }

    if (dp[ny][nx] >= cnt + 1) {
      continue;
    }

    if (answer < cnt + 1) { //정답은 젤 많이 돌때여야하니깐
      answer = cnt + 1;
    }
    dp[ny][nx] = cnt + 1;
    visited[ny][nx] = true;
    dfs(ny, nx, visited);
    visited[ny][nx] = false;
  }
}

dfs(0, 0, visited);
console.log(answer)

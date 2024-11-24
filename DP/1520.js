/**
 * 문제설명
 * 지도가 있는데 여러칸으로 나뉘었고, 해당 지점의 높이가 적혀있음
 * 상하좌우 이웃한 곳끼리 이동 가능
 * 현재 제일 왼쪽 위 칸에있는데 오른쪽아래칸으로 가려함, 항상 높이가 낮은 지점으로만 가능함 경로의 개수 구하기
 * 아이디어
 * M,N은 500이하자연수
 * dfs로 돌아가며 N,M좌표에 도달하면 증가?
 * 움직일 땐 전 값보다 낮은 곳으로 움직일 수 있음
 * 그냥 dfs를 돌리니깐 시간 초과가 났음
 * 전 값들을 이용해야함
 * dp를 -1로 초기화해 매점마다 0을찍으며 가다가 도착지 도착하면 return 1 해주기 그럼 그값을 += 로 더해줘서 시작값에 값나옴
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
  graph.push(item.split(' ').map(Number));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const dp = Array(N)
  .fill()
  .map(() => Array(M).fill(-1));

function dfs(y, x) {
  // console.log(y, x);
  if (y === N - 1 && x === M - 1) {
    return 1;
  }
  if (dp[y][x] !== -1) {
    return dp[y][x]
  }

  dp[y][x] = 0

  for (let i = 0; i < 4; i++) {
    const ny = dy[i] + y;
    const nx = dx[i] + x;

    if (0 <= nx && nx < M && 0 <= ny && ny < N) {
      if (graph[ny][nx] < graph[y][x]) {
        dp[y][x] += dfs(ny, nx)
      }
    }
  }
  return dp[y][x]
}
console.log(dfs(0, 0));

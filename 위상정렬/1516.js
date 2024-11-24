/**
 * 문제설명
 * 새로운 전략 시뮬레이션 게임 세준 크래프트 개발
 * 종족별 균형과 전체 게임 시간 등을 조절하는 부분만 남음
 * 모든 건물을 짓는데 걸리는 최소의 시간을 이용해 근사하기로 함
 * 어떤 건물을 짓기 위해서 다른 건물을 먼저 지어야 할 수도 있기 때문에 문제가 단순하지만은 않을 수 있음
 * 여러개의 건물 동시에 지을 수 있음
 * 아이디어
 * 건물의 종류 수 N, 각 건물을 짓는데 걸리는 시간과 그 건물을 짓기위해 먼저 지어져야 하는 건물이 주어짐
 * 건물의 종류 수에 따라 배열을 만들어놓고 수반되어야하는 건물을 넣고 수를 넣기
 * for문 돌면서 ready가 존재하면 그 값의 ready값에 방문하면서 시간을 더해서 출력하기
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
const ready = Array.from({ length: N + 1 }, () => []);
let inDegree = Array(N + 1).fill(0);
const time = Array(N + 1).fill(0);
const dp = Array(N + 1).fill(-1);
for (let i = 0; i < arr.length; i++) {
  const a = arr[i].split(' ').map(Number);
  time[i + 1] = a[0];
  for (let j = 1; j < a.length - 1; j++) {
    ready[a[j]].push(i + 1);
    inDegree[i + 1] += 1;
  }
}
// 2를 지으려면 1이 필수임 1-> 2면 배열1에 2를 넣음 3은 1이 필수 1에 3넣음 4는 3, 1이 필수 1에 4 3에 4
// console.log(ready);
// console.log(time);
// console.log(inDegree)

function topological() {
  const qu = [];

  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      qu.push(i);
      dp[i] = time[i];
    }
  }

  while (qu.length > 0) {
    const now = qu.shift();

    for (const next of ready[now]) {
      dp[next] = Math.max(dp[next], dp[now]); //이걸로 1이냐 중복으로 31이냐 했음
      inDegree[next] -= 1;
      // console.log(dp)
      if (inDegree[next] === 0) {
        dp[next] += time[next];
        qu.push(next);
      }
    }
  }
  for (let i = 1; i <= N; i++) {
    console.log(dp[i]);
  }
}

topological();

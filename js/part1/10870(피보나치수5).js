/*
1. 문제설명
- 피보나치는 0 1로 시작 0번째는 0 1번째는 1 2번째는 두 수의 합
- n번째 피보나치 수를 구하는 프로그램 작성
2. 아이디어
- dp??
3. 시간복잡도
- for문 한번
 */

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim();
var N = Number(input);
dp = Array(N+1).fill(0);
console.log('dp: ', dp);
if (N == 0) {
  console.log(dp[N]);
} else if (N == 1) {
  dp[N] = 1
  console.log(dp[N]);
} else {
  dp[1] = 1
  for (let i = 2; i < N + 1; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  console.log(dp[N])
}
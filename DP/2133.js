/**
 * 2133 타일 채우기 dp
 * 문제설명
 * 3×N 크기의 벽을 2×1, 1×2 크기의 타일로 채우는 경우의 수를 구해보자.
 * N은 1부터 30
 * 아이디어
 * 일단 N이 홀수일 땐 다 0임 한 타일 넓이가 2라 홀수는 안됨
 * 2칸을 채우는 경우는 3가지
 * 4칸을 채우는 경우는 2가지
 * 시간복잡도
 *
 */
const fs = require('fs');
const N = Number(fs.readFileSync('./js/input.txt').toString().trim());
// console.log('N: ', N);
// N=1일땐 0
// N=2일땐 3
// N=3일땐 0
// N=4일땐 11
const dp = Array(N + 1).fill(0);
dp[2] = 3;

for (let i = 4; i < N + 1; i++) {
  if (i % 2 === 0) {
    dp[i] = dp[i - 2] * 3 + 2; // 여기서 2는 추가적인 특수패턴
    for (let j = 2; j < i - 2; j++) {
      dp[i] += dp[j] * 2; // 이건 6을 예시로 2 - 4, 4 - 2에서 중복이 나오니까 중복을 없앤 4짜리 패턴을 곱한것
    }
  }
}
console.log(dp[N]);

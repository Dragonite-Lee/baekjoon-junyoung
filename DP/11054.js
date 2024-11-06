/**
 * 문제설명
 * 수열S가 어떤수 Sk를 기준으로 오름차순이ㅏ다가 Sk를 기점으로 내림차순이면 바이토닉 수열이라고 함
 * 수열이 주어지면 부분 수열 중 제일 긴 바이토닉 수열을 출력함
 * 아이디어
 *
 * 시간복잡도
 */
const fs = require('fs');
const [input, arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))
const N = input[0];

const up_dp = Array(N).fill(1);
const down_dp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      up_dp[i] = Math.max(up_dp[i], up_dp[j]+1)
    }
  }
}

for (let i = N-1; i >= 0; i--) {
  for (let j = i; j < N; j++) {
    if (arr[i] > arr[j]) {
      down_dp[i] = Math.max(down_dp[i], down_dp[j]+1)
    }
  }
}
let result = 0
for (let k = 0; k < N; k++) {
  result = Math.max(result, up_dp[k] + down_dp[k])
}
console.log(result-1)
/*
1. 문제설명
- 정수 n을 1, 2, 3의 합으로 나타내는 방법의 수
2. 아이디어
- dp 점화식 생성
- n이 3이상일때부터 dp[i] = dp전[i] + dp[i-사용수중큰거]
3. 시간복잡도
*/
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString().trim()
  .split('\n');

var T = Number(input)
var num_arr = arr.map(Number)
// console.log('num_arr: ', num_arr);

function sol(num) {
  var dp = Array(num+1).fill(1)
  // console.log('dp: ', dp);

  for (let i = 2; i < 4; i++) {
    for (let j = i; j < num+1; j++) {
      dp[j] = dp[j] + dp[j - i]
    }
  }
  return dp[num]
}

for (item of num_arr) {
  console.log(sol(item))
}
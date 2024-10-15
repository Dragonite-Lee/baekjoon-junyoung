/*
1. 문제설명
- 0을 10으로, 1을 01로 동시 치환 2배길이 됨
- N이 주어질 때, N번째 이진수에서 연속된 0들의 그룹이 몇 개 있나
2. 아이디어
- 이중포문으로 목표하는 리스트를 만든 뒤
- 마지막 포문으로 0배열 찾기
- 첫문자가 뭘로 시작햐냐와 
- 너무 큰 숫자는 bigint사용 -> 대신 반환 시 string으로 변환해야함
3. 시간복잡도
- dp라 시간복잡도 for문 1번 
4. 난이도
- 골드4 dp문제
*/

const fs = require('fs');
const a = fs.readFileSync('./js/input.txt').toString().trim();
const input = Number(a);
var dp = Array(input).fill(0);

for (let i = 2; i < input + 1; i++) {
  if (i % 2 === 0) {
    dp[i] = BigInt(dp[i - 1]) * 2n + 1n;
  } else {
    dp[i] = BigInt(dp[i - 1]) * 2n - 1n;
  }
}

console.log(input === 1 ? 0 : dp[input].toString());

// dp접근
// 1 0
// 01 단독1 합1
// 1001 1
// 01101001 3
// 1001011001101001 5
// 32개 11
// n은 2일 땐 result 에 2x하고 + 1함 n 3일ㄷ 땐 result 에 result dp 2x+1하고 2x-1함
// 1 2 3 4 5 6
// 0 1 1 3 5 11
// 2x-1 n2
// 2x+1 n3
// 2x-1 n4

// n이 짝수일땐 2x+1로 나옴
// n이 홀수일땐 2x-1로 나옴

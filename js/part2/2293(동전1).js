/*
1. 문제설명
- 동전이 주어지면 k를 만드는 경우의 수 구하기
2. 아이디어
- dp 점화식 구하기!!
3. 시간복잡도
- 이중for문 n은 100 k는 10,000 이라 1,000,000
*/
const [input, ...arr] = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
const [n, k] = input.split(' ').map(Number);
const coins = arr.map(Number); // 동전 리스트를 숫자로 변환

let dp = Array(k + 1).fill(0);
dp[0] = 1;

for (const coin of coins) {
  for (let i = coin; i <= k; i++) {
    dp[i] += dp[i - coin];
  }
}

console.log(dp[k]);

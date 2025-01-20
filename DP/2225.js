/**
 * 2225 합분해
 * 문제설명
 * 0부터 N까지의 정수 K개를 더해서 합이 N이 되는 경우의 수를 구해라
 * 덧셈의 순서가 바뀌면 다른경우이다. 한개의 수를 여러번 쓸 수 있음
 * 답을 1,000,000,000으로 나눈 나머지를 구해라
 * 아이디어
 * N과 K는 1~200
 * dp 로 관계식 세우기
 * 시간복잡도
 * O(N*K)
 */
const fs = require("fs");
const [input] = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, K] = input.split(" ").map(Number);

const result = Array(K + 1)
  .fill()
  .map(() => Array(N + 1).fill(1));

for (let i = 2; i < K + 1; i++) {
  result[i][1] = i;
  for (let j = 2; j < N + 1; j++) {
    result[i][j] = result[i][j - 1] + (result[i - 1][j] % 1000000000);
  }
}

console.log(result[K][N]);
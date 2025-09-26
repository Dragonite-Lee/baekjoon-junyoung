/**
 * 문제설명
 * 어떤 극장의 좌석은 한줄로 되어있다. 1 ~ N까지 번호가 매겨짐
 * 자기의 입장권에 표시되어 있는 좌석에 앉아야 함
 * 단, 자기의 바로 왼쪽이나 오른쪽으론 옮길 수 있음
 * vip회원들은 반드시 자기 좌석에만 앉아야 함
 * 1 ~ N 좌석이 다팔렸는데, VIP의 좌석번호가 주어졋을때 서로다른방법의 가짓수 구하기
 * 아이디어
 * 일단 무조건 vip는 자기 좌석에 앉혀야 함
 * vip자리까지 dp로 나아가는데,
 * dp를 2개로두고 바꿔앉을때, 안바꿔앉을때로 두기
 * 시간복잡도
 *
 */

const fs = require("fs");
const [input, ...arr] = fs.readFileSync("./input.txt").toString().split("\n");
const N = Number(input);
const M = Number(arr[0]);
const vip = [];
for (let i = 1; i <= M; i++) {
  vip.push(Number(arr[i]));
}

const dp = Array(N + 1).fill(0);
// [안바꿈,바꿈]
dp[0] = 1;
dp[1] = 1;
dp[2] = 2;
// dp[i][0] = dp[i-1][1] + dp[i-1][0]
// dp[i][1] = dp[i-1][0]
for (let i = 3; i < N + 1; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}
// console.log("dp: ", dp);
result = 1;
let prev = 0;
for (item of vip) {
  const num = item - prev - 1 === 0 ? 1 : item - prev - 1;
  result *= dp[num];
//   console.log("result: ", result);
  prev = item;
}

// console.log("prev: ", prev);
// console.log("result: ", result);
const num = N - prev === 0 ? 1 : N - prev;
result *= dp[num];
console.log(result);

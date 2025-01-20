/**
 * 문제설명
 * 소설을 여러 장으로 나누어쓰는데, 각 장은 다른 파일에 저장하곤 한다.
 * 모든 장을 쓰고나선 각 장이 쓰여진 파일을 합쳐서 최종적으로 한개의 파일을 만듬
 * 이 과정에서 2개를 합해 임시파일을 만들고, 임시파일이나 원래 파일을 계속 두개씩 합쳐서 여러장들이 연속되도록 합치고
 * 최족적으로 하나로 합침
 * 두개를 합칠때 필요한 비용이 두파일크기의 합일때 한개를만들때 드는 총합을 최소로 구하기
 * 아이디어
 * K가 500이하라 이중포문도 가능
 * dp[i][j] 는 i번째 장부터 j번째 장까지 합치는 최소 비용
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const T = Number(input);

for (let z = 1; z <= T; z++) {
  const K = Number(arr[2 * z - 2]);
  let num_arr = arr[2 * z - 1].split(' ').map(Number);

  let result = 0;
  num_arr.unshift(0);

  
  let dp = Array(K + 1)
    .fill()
    .map(() => Array(K + 1).fill(0));
  // 누적합 dp에 기록
  let con_sum = [];
  let sum = 0;
  for (let i = 1; i < K + 1; i++) {
    con_sum.push(sum);
    sum += num_arr[i];
  }
  con_sum.push(sum);
  // console.log(con_sum);
  for (let i = 1; i < K + 1; i++) {
    for (let j = 1; j < K + 1; j++) {
      if (j === i + 1) {
        dp[i][j] = num_arr[i] + num_arr[j];
      }
    }
  }
  // console.log(dp)
  // dp는 맨 밑에서부터 위로 올라오면서 dp를 채워나간다.
  for (let i = K - 1; i > 0; i--) {
    for (let j = 1; j < K + 1; j++) {
      if (dp[i][j] === 0 && j > i) {
        // console.log(i, j);
        for (let k = i; k < j; k++) {
          // console.log(k);
          if (dp[i][j] === 0) {
            dp[i][j] = dp[i][k] + dp[k + 1][j] + con_sum[j] - con_sum[i-1];
            // console.log('dp[i][j]: ', dp[i][j]);
          } else {
            dp[i][j] = Math.min(
              dp[i][j],
              dp[i][k] + dp[k + 1][j] + con_sum[j] - con_sum[i-1]
            );
            // console.log('dp[i][j]: ', dp[i][j]);
          }

          // console.log(dp);
        }
      }
    }
  }
  console.log(dp[1][K]);
}
// 40 30 30 50
// 40 30 30
// (40+30) + (40+30)+30
// 40+(30+30) + (30+30)
// (30+30) + (30+30)+50
// 30+(30+50) + (30+50)
// 0~0은 0
// 1~1 40
// 1~2 70
// 1~3 100
// 1~4 150
// dp[i][i+1] = sum[i+1] - sum[i-1]
// dp[1][2]는 첫번째부터 두번째장까지 합치는 최소 비용
// dp[2][3]는 2부터 3까지 합치는 최소비용

// 40 30 30 이 있는데 최소 구하는거
// 1. 40 30 합치고 30
// dp[1][3] = dp[1][3]과 dp[1][2] + sum[3]
// dp[1][3] = dp[1][3]과 dp[2][3] + sum[3]
// 2. 30 30 합치고 40
// dp [1][3] = dp[1][3]과 dp[1][1] + dp[2][3] + sum[2] - sum[0]
// 1234까지 최소는
// dp[1][1] + dp[2][4]
// dp[1][2] + dp[3][4]
// dp[1][3] + dp[4][4]
// 2 4
// 22 34
// 23 44

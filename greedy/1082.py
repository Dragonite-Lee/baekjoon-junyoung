# /**
#  * 문재설명
#  * 사무실에 방번호를 직접 정할 수 있음
#  * 이를 위해 숫자를 구매해야하는데, 구매하기 위해 준비한 금액은 M원이다.
#  * 숫자는 0 ~ N-1이며 각 숫자의 가격은 Pi이다
#  * 같은 숫자를 여러개 구매할 수 있고, 무한정 많이도 가능
#  * 방번호가 0이 아니라면 0으로 시작할 수 없다.
#  * 최대M원으로 만들 수 있는 가장 큰 방번호를 구해보자.
#  * 아이디어
#  * cost배열의 index가 숫자가 됨
#  * cost배열을 마지막 Index부터 str로 붙이면서 총금액에서 깎아가기
#  * 방번호가 높은거부터 담아야하므로 최댓값을 가지고와서 내림차순으로 실행하기
#  * 해당 가격으로 살 수 있는 최대 방번호(인덱스)를 디피에 담기
#  * 총금액이 각 가격의 배수가 될때마다 그값을 2번 사용할 수 있으므로
#  * dp 인덱스에서 가격을 빼서 10을 곱한수와, dp값과 인덱스값중 맥스를 갱신한다.
#  * 시간복잡도
#  *
#  */
# const fs = require('fs');
# const [input, arr, input2] = fs
#   .readFileSync('./js/input.txt')
#   .toString()
#   .trim()
#   .split('\n');

# const N = Number(input);
# const M = Number(input2);
# const cost = arr.split(' ').map(Number);

# let dp = Array(M + 1).fill(-1);
# dp[0] = 0;

# for (let i = N - 1; i >= 0; i--) {
#   let c = cost[i];
#   for (let j = c; j <= M; j++) {
#     if (dp[j - c] !== -1) {
#       dp[j] = Math.max(
#         dp[j] === -1 ? -1 : dp[j], 
#         i, 
#         dp[j - c] * 10 + i
#       );
#     }
#   }
# }
# console.log(dp[M]);
# // 21 8
# // 13 8
# // 5 8
# // 2 1 0
# // 8 7 6
# // 맥스는 21

# // 6 7 8 9 10
# // 0 1 2 2 2
# // 11 12 13 14
# // 2   2  2 20
# // 8원
# // dp[j-c] * 10 + i
# // 2 20
import sys
input = sys.stdin.readline

N = int(input())
cost = list(map(int, input().split()))
M = int(input())

dp = [-1 for _ in range(M+1)]
# print(dp)
for i in range(N-1,-1,-1):
  c = cost[i]
  for j in range(c,M+1):
    dp[j] = max(dp[j], i, dp[j-c]*10+i)
print(dp[M])
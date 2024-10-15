"""
1. 문제설명
- 중간에 나오는 수가 0이상 20이하 여야함 
- 상근이가 만들 수 있는 등식의 갯수
- 중간중간 + - 넣고 마지막엔 =
2. 아이디어

3. 시간복잡도
"""

import sys
input = sys.stdin.readline

N = int(input())
num_arr = list(map(int, input().split()))

dp = [[0] * (21) for _ in range(N-1)]
dp[0][num_arr[0]] = 1

for i in range(1, N-1):
  for j in range(21):
    if dp[i-1][j]:
      sum_v = j + num_arr[i]
      minus_v = j - num_arr[i]
      if sum_v <= 20:
        dp[i][sum_v] += dp[i-1][j]
      if 0 <= minus_v:
        dp[i][minus_v] += dp[i-1][j]

print(dp[-1][num_arr[-1]])
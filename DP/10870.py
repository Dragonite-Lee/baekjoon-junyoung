import sys
input = sys.stdin.readline
N = int(input())
dp = [0 for _ in range(N+1)]
if N == 0:
  print(0)
elif N == 1:
  print(1)
else:
  dp[1] = 1
  for i in range(2, N + 1):
    dp[i] = dp[i-1] + dp[i-2]
  print(dp[N])
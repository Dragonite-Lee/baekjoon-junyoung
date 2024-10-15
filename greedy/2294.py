import sys
input = sys.stdin.readline

n, k = map(int, input().split())
num_arr = []
for _ in range(n):
  num_arr.append(int(input()))

dp = [10001 for _ in range(k+1)]
dp[0] = 0
# print(dp)

for coin in num_arr:
  for i in range(coin, k+1):
    dp[i] = min(dp[i], dp[i-coin]+1)
# print(dp)
if dp[k] == 10001:
  print(-1)
else:
  print(dp[-1])


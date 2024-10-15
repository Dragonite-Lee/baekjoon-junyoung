import sys
input = sys.stdin.readline

n, k = map(int, input().split())
# print(n,k)
num_arr = []
for _ in range(n):
  num_arr.append(int(input()))
# print(num_arr)
dp = [0 for _ in range(k+1)]
dp[0] = 1
# print(dp)
for coin in num_arr:
  for i in range(coin, k+1):
    dp[i] = dp[i] + dp[i-coin]
print(dp[k])
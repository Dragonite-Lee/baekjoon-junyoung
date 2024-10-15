"""
1. 문제설명
- 계단은 한번에 한칸 또는 두칸씩 오를 수있음
- 연속된 세개의 계단을 밟아선 안됨
- 마지막계단은 밟아야함
"""
import sys
input = sys.stdin.readline
N = int(input())
step = []
for _ in range(N):
  a = int(input())
  step.append(a)
# print(step)
dp = [0 for _ in range(N+1)]
dp[1] = step[0]
if N >= 2:
  dp[2] = step[0] + step[1]


if N >= 3:
  dp[3] = max(step[0] + step[2], step[1] + step[2])
  for i in range(4, N+1):
    dp[i] = max(dp[i-3] + step[i-1] + step[i-2], dp[i-2] + step[i-1])

print(dp[N])
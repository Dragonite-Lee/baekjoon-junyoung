"""
1. 문제설명
- 회의실 문제
2. 아이디어
임의의 회의 K(1≤ K ≤ N)는 회의 K − 1과 회의 K + 1과는 회의 시간이 겹치고 다른 회의들과는 회의 시간이 겹치지 않는다. 
이 조항 덕분에 dp 성립
3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N = int(input())
time = []
for _ in range(N):
  start, end, count = map(int, input().split())
  time.append([start,end,count])

time.sort(key=lambda x: x[0])
dp = [0] * N
dp[0] = time[0][2]
for i in range(1,N):
  dp[i] = max(dp[i-1], dp[i-2] + time[i][2])

print(dp[N-1])
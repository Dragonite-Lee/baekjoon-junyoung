"""
1. 문제설명
- N개의 회의와 1개의 회의실 존재
- 시작시간, 끝나는시간, 회의 인원이 주어짐
- 회의 진행 가능한 최대 인원
2. 아이디어

3. 시간복잡도
"""
import sys
input = sys.stdin.readline
from bisect import bisect_right

N = int(input())
time = []
for _ in range(N):
  start, end, count = map(int, input().split())
  time.append([start,end,count])

time.sort(key=lambda x: x[1])

dp = [0] * N
end_times = [0] * N

dp[0] = time[0][2]
end_times[0] = time[0][1]

for i in range(1, N):
  j = bisect_right(end_times, time[i][0], 0, i) - 1
  # print(end_times)
  # print(i, j)
  if j >= 0:
    dp[i] = max(dp[i-1], dp[j] + time[i][2])
  else:
    dp[i] = max(dp[i-1], time[i][2])
  # print(dp)
  end_times[i] = time[i][1]
  # print(end_times)
  # print('=====')
print(dp[N-1])
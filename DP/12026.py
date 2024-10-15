"""
1.문제설명
- BOJ 순서로 뛸 수 있음
- 점프뛰어서 N까지가기
2.아이디어
- Dp로 한칸한칸 넘기며가기
3.시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
graph = list(input().strip())
# print(graph)

dp = [1000001 for _ in range(N)]
dp[0] = 0

def getPrev(x):
  if x == "O":
    return "B"
  elif x == "J":
    return "O"
  elif x == "B":
    return "J"

for i in range(1,N):
  for j in range(i):
    prev = getPrev(graph[i])
    if graph[j] == prev:
      dp[i] = min(dp[i], (i-j)*(i-j) + dp[j])

if dp[N-1] == 1000001:
  print(-1)
else:
  print(dp[N-1])
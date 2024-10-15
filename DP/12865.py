"""
1. 문제설명
- N개의 물건이 있음 각각 W무게 V가치를 가짐 해당물건은 V만큼 즐길 수 있음 
- 최대 K만큼의 무게만 넣을 수 있음
2. 아이디어
- N은 100 K는 100,000 W는 100,000 V는 1,000
"""
import sys
input = sys.stdin.readline

N, K = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(N)]

dp = [[0] * (K+1) for _ in range(N+1)]
# print(dp)
for i in range(1, N+1):
  for j in range(1, K+1):
    if graph[i-1][0] <= j: #현재 최대 무게 j가 물건 무게 보다 큼
      dp[i][j] = max(graph[i-1][1] + dp[i-1][j - graph[i-1][0]], dp[i-1][j])
    else:
      dp[i][j] = dp[i-1][j]
    
print(dp[N][K])
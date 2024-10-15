"""
1. 문제설명
- N개의 도시가 있음 한도시 -> 다른 도시 M개의 버스가 있음
- 출발도시 - 도착도시 - 비용
- 마지막 줄은 시작점 끝점
2. 아이디어
- 매순간 낮은거 찾기!!! 다익스트라 알고리즘
3. 시간복잡도
- 
"""

import sys
import heapq
input = sys.stdin.readline

N = int(input())
M = int(input())
graph = [[] for _ in range(N+1)]
for _ in range(M):
  s, e, cost = map(int, input().split())
  graph[s].append([e, cost])
start, end = map(int, input().split())

costs = [1e9 for _ in range(N+1)]
costs[start] = 0
hp = []
heapq.heappush(hp, [start, 0])

# print(graph)
while hp:
  de, cost = heapq.heappop(hp)
  if costs[de] < cost: 
    continue
  # print(cost, de)
  for next_v, next_cost in graph[de]:
    if costs[next_v] <= next_cost + costs[de]:
      continue
    costs[next_v] = next_cost + costs[de]
    heapq.heappush(hp, ([next_v, next_cost + costs[de]]))

print(costs[end])
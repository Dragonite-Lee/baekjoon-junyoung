"""
1. 문제설명

2. 아이디어

3. 시간복잡도

"""
import sys
import heapq
input = sys.stdin.readline

N, M, K, X = map(int, input().split())
graph = [[] for _ in range(N+1)]
costs = [N+1] * (N+1)

for _ in range(M):
  start, end = map(int, input().split())
  graph[start].append([1,end])
# print(graph)
costs[X] = 0
hp = [[0,X]]

while hp:
  # print(hp)
  dis, s = heapq.heappop(hp)
  # print(dis, s, costs[dis])
  if costs[s] < dis:
    continue
  for next_d, next_s in graph[s]:
    # print('nexts',next_s)
    if costs[next_s] > dis + next_d:
      costs[next_s] = dis + next_d
      heapq.heappush(hp,[costs[next_s], next_s])
# print(costs)
result = []
for id,item in enumerate(costs):
  if item == K:
    print(id)
    result.append(id)

if len(result) == 0:
  print(-1)
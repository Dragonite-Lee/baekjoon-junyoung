"""
## 문제 설명
정점의 개수 V와 간선의 개수 E가 주어지면 시작 위치부터 최단 경로의 경로값 출력

## 아이디어
- 한점에서 다른 모든 점으로의 최단경로 > 다익스트라 사용
- 모든 점 거리 초기값 무한대로 설정
- 시작점 거리 0 설정 및 힙에 추가
- 힙에서 하나씩 빼면서 수행할 것
    - 현재 거리가 새로운 간선 거칠때보다 크다면 갱신
    - 새로운 거리 힙에 추가

## 시간 복잡도
- 다익스트라 시간복잡도: E log V
    - E는 300,000 V는 20,000
- heap은 최대최소를 빨리 가져올 수 있음
    - heap의 삽입 / 삭제는 log N의 시간복잡도가 걸림
"""
import sys
import heapq
INF = sys.maxsize
input = sys.stdin.readline

V, E = map(int, input().split())
K = int(input())
graph = [[] for _ in range(V+1)]
costs = [INF] * (V+1)

for i in range(E):
  s, e, c = map(int, input().split())
  graph[s].append([c, e])
# print(graph)

# print(costs)
costs[K] = 0
hp = [[0, K]]

while hp:
  cost, start = heapq.heappop(hp)
  if costs[start] < cost:
    continue
  for next_c, next_s in graph[start]:
    if costs[next_s] > cost + next_c:
      costs[next_s] = cost + next_c
      heapq.heappush(hp, [costs[next_s], next_s])

for i in range(1,V+1):
  if costs[i] == INF:
    print("INF")
  else:
    print(costs[i])

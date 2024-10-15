"""
1. 문제설명
- 벽 3개를 세울 수 있음
- 바이러스가 퍼지는걸 최대한 막아 안저영역의 최대크기 구하기
2. 아이디어
- 먼저 벽 3개를 어딘가 세우기 -> 그래프를 한번 돌아서 빈칸 위치를 찾음 거기서 combi 로 벽위치를 둔다음에
- 해당 벽 위치일때 바이러스 퍼지게하기
- 돌아서 안전영역 개수세기
3. 시간복잡도
- 64 300정도에 64
"""
import sys
from itertools import combinations
from collections import deque
import copy
input = sys.stdin.readline
N, M = map(int, input().split())

graph = [list(map(int, input().split())) for _ in range(N)]
graph_cp = copy.deepcopy(graph)
empty_location = []

for y in range(N):
  for x in range(M):
    if graph[y][x] == 0:
      empty_location.append([y,x])

result = 0


def bfs(y,x):
  global visited, graph_cp
  dx = [1, 0, -1, 0]
  dy = [0, 1, 0, -1]
  dq = deque()
  dq.append((y,x))
  while dq:
    y, x = dq.popleft()
    
    for i in range(4):
      ny = y + dy[i]
      nx = x + dx[i]

      if 0 <= ny < N and 0 <= nx < M and visited[ny][nx] == False:
        if graph_cp[ny][nx] == 0:
          graph_cp[ny][nx] = 2
          visited[ny][nx] = True
          dq.append((ny,nx))


for wall in combinations(empty_location, 3):
  # 3군데 벽 세움
  for j in range(3):
    graph_cp[wall[j][0]][wall[j][1]] = 1

  visited = [[False] * M for _ in range(N)]
  for y in range(N):
    for x in range(M):
      if graph_cp[y][x] == 2 and visited[y][x] == False:
        visited[y][x] = True
        bfs(y,x)

  
  # 안전지역 갯수세기
  cnt = 0
  for y in range(N):
    for x in range(M):
      if graph_cp[y][x] == 0:
        cnt += 1
  

  result = max(result, cnt)
  #다시 되돌리기
  graph_cp = copy.deepcopy(graph)
  
print(result)
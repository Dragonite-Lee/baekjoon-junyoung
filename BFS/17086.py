"""
1. 문제설명
- N * M크기에 아기상어 여러마리 존재 
- 어떤 칸의 안정거리는 그 칸과 가장 거리가 가까운 아기상어와의 거리. 
- 거리란 해당칸에서 다른칸으로 가기위해 지나야하는 칸의 수이고 8방향으로 갈 수 있음
- 안전커리가 가장 큰 칸
2. 아이디어
-이중포문 돌면서 1인아이 넣기
-1인아이 넣으면 그 위치에서 대각선으로 이동하면서 1인 위치 찾으면 break하고 cnt 넣기
3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(N)]
visited = [[False] * M for _ in range(N)]
result = 0

def bfs(y,x):
  dx = [1, 0, -1, 0, 1, 1, -1, -1]
  dy = [0, 1, 0, -1, 1, -1, 1, -1]
  qu = deque()
  qu.append((y,x,0))
  find = False
  distance = 0
  while qu:
    # print(qu)
    ey, ex, dis = qu.popleft()
    for i in range(8):
      ny = ey + dy[i]
      nx = ex + dx[i]
      if 0 <= nx < M and 0 <= ny < N and visited[ny][nx] == False:
        if graph[ny][nx] == 0:
          visited[ny][nx] = True
          qu.append((ny,nx, dis+1))
        else:
          # print(ny,nx,dis)
          find = True
          distance = dis+1
          break
    if find:
      break
  return distance

for y in range(N):
  for x in range(M):
    if graph[y][x] == 0:
      visited[y][x] = True
      # print(y,x)
      # print(result)
      result = max(result, bfs(y,x))
      # print(result)
      # print('===')
      visited = [[False] * M for _ in range(N)]

print(result)

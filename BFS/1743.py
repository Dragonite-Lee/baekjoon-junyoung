import sys
from collections import deque
input = sys.stdin.readline
N, M, K = map(int,input().split())
graph = [[0] * M for _ in range(N)]
visited = [[False] * M for _ in range(N)]

for _ in range(K):
  y, x = map(int,input().split())
  # print(y,x)
  graph[y-1][x-1] = 1

dq = deque()
result = 0
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
# print(graph)
def bfs(y,x):
  dq.append((y,x))
  cnt = 0
  while dq:
    
    ey, ex = dq.popleft()
    cnt += 1
    for i in range(4):
      ny = ey + dy[i]
      nx = ex + dx[i]

      if 0 <= nx < M and 0 <= ny < N:
        if graph[ny][nx] == 1 and visited[ny][nx] == False:
          visited[ny][nx] = True
          dq.append((ny, nx))
  # print(cnt)
  return cnt

for i in range(N):
  for j in range(M):
    if graph[i][j] == 1 and visited[i][j] == False:
      visited[i][j] = True
      result = max(result,bfs(i,j))
print(result)
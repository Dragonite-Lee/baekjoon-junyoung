import sys
from collections import deque
input = sys.stdin.readline
N, M = map(int, input().split())

graph = [list(map(int, input().strip())) for _ in range(N)]
visited = [[False] * M for _ in range(N)]
# print(N,M)
# print(graph)
# print(visited)
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
dq = deque()
def bfs(y,x):
  dq.append((y,x))

  while dq:
    # print(dq)
    [ey, ex] = dq.popleft()

    for i in range(4):
      ny = ey + dy[i]
      nx = ex + dx[i]
      # print(ny,nx)
      # print(visited)
      if 0 <= nx < M and 0 <= ny < N:
        if graph[ny][nx] == 1:
          # print('내부',ny,nx)
          graph[ny][nx] = graph[ey][ex] + 1
          # visited[ny][nx] = True
          dq.append((ny,nx))

# for i in range(N):
#   for j in range(M):
#     if graph[i][j] == 1 and visited[i][j] == False:
#       bfs(i,j)
#       visited[i][j] = True
# visited[0][0] = True
bfs(0,0)
# print(graph)
print(graph[N-1][M-1])
"""
1. 문제설명
- 보드 N - M 과 동전위치 2개가 주어짐 하나만 떨어뜨리는데 몇번 눌러야하는지
2. 아이디어
- bfs로 돌리기? -> 동전 위치를 y,x,y,x로 두고 시작
- 움직이는데 벽이 아니면 움직일 수 있음
- pop값이 보드내에 있지 않으면 return
3. 시간복잡도 N,M 이 20 20 이라 가능
"""

import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = []
dq = deque()
coin = []
for i in range(N):
  arr = list(input().strip())
  for j in range(len(arr)):
    if arr[j] == 'o':
      coin.append([i,j])

  graph.append(arr)

visited = [[[[False for _ in range(M)] for _ in range(N)] for _ in range(M)] for _ in range(N)]
dq.append([coin[0][0], coin[0][1], coin[1][0], coin[1][1], 0])
visited[coin[0][0]][coin[0][1]][coin[1][0]][coin[1][1]] = True

result = 0
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
check = False
while dq:
  y1, x1, y2, x2, cnt = dq.popleft()
  # print(y1,x1,y2,x2)
  if check == True:
    break
  if (0 <= y1 < N and 0 <= x1 < M and (y2 < 0 or y2 >= N or x2 < 0 or x2 >= M)) or (0 <= y2 < N and 0 <= x2 < M and (y1 < 0 or y1 >= N or x1 < 0 or x1 >= M)):
    break
  if cnt >= 10:
    result = -1
    break

  for i in range(4):
    ny1 = y1 + dy[i]
    nx1 = x1 + dx[i]
    ny2 = y2 + dy[i]
    nx2 = x2 + dx[i]
    # print(ny1,nx2,ny2,nx2)
    if 0 <= ny1 < N and 0 <= nx1 < M and 0 <= ny2 < N and 0 <= nx2 < M:
      if graph[ny1][nx1] != '#' and graph[ny2][nx2] != '#' and visited[ny1][nx1][ny2][nx2] == False:
        dq.append([ny1,nx1,ny2,nx2,cnt+1])
        visited[ny1][nx1][ny2][nx2] = True
      elif graph[ny1][nx1] == '#' and graph[ny2][nx2] != '#' and visited[y1][x1][ny2][nx2] == False:
        dq.append([y1,x1,ny2,nx2,cnt+1])
        visited[y1][x1][ny2][nx2] = True
      elif graph[ny1][nx1] != '#' and visited[ny1][nx1][y2][x2] == False and graph[ny2][nx2] == '#':
        dq.append([ny1,nx1,y2,x2,cnt+1])
        visited[ny1][nx1][y2][x2] = True
    else:
      # print('걸림', ny1,nx1,ny2,nx2)
      if (0 <= ny1 < N and 0 <= nx1 < M and (ny2 < 0 or ny2 >= N or nx2 < 0 or nx2 >= M)) or (0 <= ny2 < N and 0 <= nx2 < M and (ny1 < 0 or ny1 >= N or nx1 < 0 or nx1 >= M)):
        # print('=====34324324')
        check = True
        result = cnt+1
        break
  # print(dq)
  # print(visited)
  # print(cnt)
if result == 0:
  print(-1)
else:
  print(result)

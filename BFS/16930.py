"""
1. 문제설명
- N*M 크기의 체육관을 달리려고한다. x,y로 나타냄
- 매초마다 진영이는 위, 아래, 오른쪽, 왼쪽 중 하나를 골라 최소1개 최대K개 빈칸 이동
- 시작점과 도착점이 주어질때 최소시간 구하기
- 빈칸은 . 벽은 #
- 이동할수없으면 -1
2. 아이디어

3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline

N, M, K = map(int,input().split())
graph = [list(input().strip()) for _ in range(N)]
visited = [[-1] * M for _ in range(N)]
y1, x1, y2, x2 = map(int,input().split())
y1, x1, y2, x2 = y1-1, x1-1, y2-1, x2-1
dq = deque()
dq.append((y1, x1))

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
visited[y1][x1] = 0
# print(visited)

while dq:
  # print(dq)
  ey, ex = dq.popleft()
  if ey == y2 and ex == x2:
    break

  for i in range(4):
    for k in range(1, K+1):
      ny, nx = ey + dy[i] * k, ex + dx[i] * k
      if 0 > ny or ny >= N or 0 > nx or nx >= M:
        break
      if graph[ny][nx] == '#':
        break
      if graph[ny][nx] == '.' and visited[ny][nx] == -1:
        visited[ny][nx] = visited[ey][ex] + 1
        dq.append((ny,nx))
      elif visited[ny][nx] > visited[ey][ex]:
        continue
      else:
        break
     
# print(visited)
print(visited[y2][x2])
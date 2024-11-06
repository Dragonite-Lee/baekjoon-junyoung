"""
1. 문제설명
- 1은 검은돌 2는 흰돌 0은 빈자리
- 누가 이겼는지 출력 : 검 1 흰 2 승부안나면 0 승부가 났으면 가장 왼쪽의 가로세로 줄 번호 출력
2. 아이디어
- 이중포문으로 돌을 찾다가 1이면 1을 넣고 대각선으로 확인, 세로로 확인, 가로로 확인 갯수 반환 
- 그때 젤 왼쪽이나 위의 위치도 반환
3. 시간복잡도

"""
import sys 
from collections import deque
input = sys.stdin.readline

graph = [list(map(int, input().split())) for _ in range(19)]
visited = [[False] * 19 for _ in range(19)]
# print(graph)
def count_ga(y, x, target):
  dx = [1,-1]
  min_val = x
  dq = deque()
  dq.append((y,x))
  cnt = 1
  while dq:
    ey, ex = dq.pop()
    for i in range(2):
      ny = ey
      nx = ex + dx[i]
      if 0 <= ny < 19 and 0 <= nx < 19 and visited[ny][nx] == False:
        if graph[ny][nx] == target:
          min_val = min(min_val, nx)
          cnt += 1
          visited[ny][nx] = True
          dq.append((ny,nx))
  return cnt, y, min_val

def count_se(y, x, target):
  # print(y,x)
  dy = [1,-1]
  min_val = y
  dq = deque()
  dq.append((y,x))
  cnt = 1
  while dq:
    ey, ex = dq.pop()
    for i in range(2):
      ny = ey + dy[i]
      nx = ex
      if 0 <= ny < 19 and 0 <= nx < 19 and visited[ny][nx] == False:
        if graph[ny][nx] == target:
          min_val = min(min_val, ny)
          cnt += 1
          visited[ny][nx] = True
          dq.append((ny,nx))
  return cnt, min_val, x

def count_de_ri(y, x, target):
  dx = [1,-1]
  dy = [1, -1]
  min_val = y, x
  dq = deque()
  dq.append((y,x))
  cnt = 1
  while dq:
    ey, ex = dq.pop()
    for i in range(2):
      ny = ey + dy[i]
      nx = ex + dx[i]
      if 0 <= ny < 19 and 0 <= nx < 19 and visited[ny][nx] == False:
        if graph[ny][nx] == target:
          min_val = min(min_val, (ny,nx))
          cnt += 1
          visited[ny][nx] = True
          dq.append((ny,nx))
  return cnt, min_val[0], min_val[1]

def count_de_le(y, x, target):
  dx = [1, -1]
  dy = [-1, 1]
  min_val = x, y
  dq = deque()
  dq.append((y,x))
  cnt = 1
  while dq:
    ey, ex = dq.pop()
    for i in range(2):
      ny = ey + dy[i]
      nx = ex + dx[i]
      if 0 <= ny < 19 and 0 <= nx < 19 and visited[ny][nx] == False:
        if graph[ny][nx] == target:
          min_val = min(min_val, (nx,ny))
          cnt += 1
          visited[ny][nx] = True
          dq.append((ny,nx))
  return cnt, min_val[1], min_val[0]

find = False

for y in range(19):
  for x in range(19):
    if graph[y][x] != 0:
      # print(y, x)
      visited[y][x] = True
      de_le = count_de_le(y, x, graph[y][x])
      de_ri = count_de_ri(y, x, graph[y][x])
      se = count_se(y, x, graph[y][x])
      ga = count_ga(y, x, graph[y][x]) 
      if de_le[0] == 5:
        print(graph[y][x])
        print(de_le[1]+1, de_le[2]+1)
        find = True
        break
      elif de_ri[0] == 5:
        print(graph[y][x])
        print(de_ri[1]+1, de_ri[2]+1)
        find = True
        break
      elif se[0] == 5:
        print(graph[y][x])
        print(se[1]+1, se[2]+1)
        find = True
        break
      elif ga[0] == 5:
        print(graph[y][x])
        print(ga[1]+1, ga[2]+1)
        find = True
        break
    visited = [[False] * 19 for _ in range(19)]
  if find:
    break
if not find:
  print(0)
"""
1. 문제설명
- 상어는 자기보다 작은 물고기만 먹음 큰 물고기 칸은 못지나가고 크키가 같으면 먹진 못하고 지나갈순있음
- 더이상 못먹으면 도움
- 1마리면 그거 먹으러가고 여러마리면 가까운 물고기를 먹으러감 거리가 같으면 가장위 왼쪽으로 먹음 
- 크기와 같은 수의 물고기를 먹을 때 크키가 1증가
2. 아이디어
- bfs를 이용해 현지 위치에서 갈 수 있는 모든곳의 거리를 visited에 담고 리턴함
- solve함수에 visited를 받아서 가장 근거리에 있는 먹이 위치를 구함, 먹이가 없으면 false반환
- 먹이가 있다면 현재 위치와 먹이 갯수를 업데이트 
- 조건에 따라 먹이 갯수가 상어의 사이즈와 같아지면 사이즈 업그레이드

-> bfs는 최단거리를 계산해준다 이를 바탕으로 문제를 푸는 연습!! 조건이 더해질 것
3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
graph = [list(map(int, input().split())) for _ in range(N)]

shark_size = 2
now_y, now_x = 0, 0
INF = 1e9
# 상어 초기 위치 찾기
for y in range(N):
  find = False
  for x in range(N):
    if graph[y][x] == 9:
      graph[y][x] = 0
      now_y, now_x = y, x
      find = True
      break
  if find:
    break

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
# 현재 위치에서 각 물고기까지 거리를 반환 지나는 경로마다 값을 저장
def bfs():
  qu = deque([(now_y, now_x)])
  visited = [[-1] * N for _ in range(N)]
  visited[now_y][now_x] = 0
  
  while qu:
    y, x = qu.popleft()

    for i in range(4):
      ny, nx = y + dy[i], x + dx[i]
      if 0 <= ny < N and 0 <= nx < N:
        if shark_size >= graph[ny][nx] and visited[ny][nx] == -1:
          visited[ny][nx] = visited[y][x] + 1
          qu.append((ny, nx))
  return visited

def solve(visited):
  # print(visited)
  a, b = 0, 0
  min_distance = INF
  for y in range(N):
    for x in range(N):
      if visited[y][x] != -1 and 1 <= graph[y][x] < shark_size:
        if visited[y][x] < min_distance:
          min_distance = visited[y][x]
          a, b = y, x
  if min_distance == INF:
    return False
  else:
    return a, b, min_distance

answer = 0
food = 0

while True:
  result = solve(bfs())
  # print(result)
  if not result:
    print(answer)
    break
  else:
    now_y, now_x = result[0], result[1]
    answer += result[2]
    graph[now_y][now_x] = 0
    food += 1

  if food == shark_size:
    shark_size += 1
    food = 0
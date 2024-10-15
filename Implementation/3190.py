"""
1. 문제설명
- 사과를 먹으면 뱀의 길이가 늘어나고, 벽또는 자기 자신과 부딪히면 게임 끝남
- 몸의길이를 늘려 머리를 다음칸에 둠
- 만약 벽이나 자기자신의 몸과 부딪히면 게임 끝
- 이동한 칸에 사과가 있다면, 그 칸에있던 사과는 없어지고 꼬리는 움직이지 않는다.
- 이동한 칸에 사과가 없다면, 몸길이를 줄여 꼬리가 위치한 칸을 비워준다. 즉 몸길이는 변하지않음
- 사과의 위치와 뱀의 이동경로가 주어질때 몇초에 게임이 끝나는지
2. 아이디어
while문으로 조건걸고 진행
현재위치에서 이동할 좌표만들고
뱀이 차지하는 부분은 1로 채우기 전진할때 사과를 먹으면 꼬리가 그대로 
방향 전환 타이밍에 전환해주기
3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline
N = int(input()) # 보드 크기
K = int(input()) # 사과 개수
apple_location = [list(map(int, input().split())) for _ in range(K)]
L = int(input()) # 뱀의 방향 변환 횟수
dir_dict = dict()
for i in range(L):
    x, c = input().split()
    dir_dict[int(x)] = c

graph = [[0] * N for _ in range(N)]
for apple in apple_location:
  graph[apple[0]-1][apple[1]-1] = 2

def turn(alpha):
  global direction_index
  if alpha == 'L': #왼쪽회전
    direction_index = (direction_index - 1) % 4 
  else:
    direction_index = (direction_index + 1) % 4 

dq = deque()
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
graph[0][0] = 1
time = 0
direction_index = 0
y, x = 0, 0
dq.append((y,x))
while True:
  #이동
  time += 1
  x += dx[direction_index]
  y += dy[direction_index]
  # print(y,x)
  if 0 <= y < N and 0 <= x < N and graph[y][x] != 1:
    if graph[y][x] == 0:
      dq.append((y,x))
      graph[y][x] = 1
      ny, nx = dq.popleft()
      graph[ny][nx] = 0
      if time in dir_dict:
        turn(dir_dict[time])
    else: #사과를 먹음
      dq.append((y,x))
      graph[y][x] = 1
      if time in dir_dict:
        turn(dir_dict[time])
  else:
    break
print(time)
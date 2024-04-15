"""
1. 아이디어
- 특정 조건 만족하는 한 계속 이동 -> while문 (특정 조건시 break)
- 4방향 탐색 먼저 수행 -> 빈칸 있을 경우 이동
- 4방향 탐색 안될 경우, 뒤로 한칸 가서 반복 (뒤로 못가면 종료)

2. 시간복잡도
- while문 최대 N*M (N이 세로줄 M이 가로줄)
- 각 칸에서 4방향 연산 수행
- 따라서 N*M*4인데 시간복잡도 O는 상수를 떼니까 O(NM)이게 2억을 초과하는지 확인
- 해당 문제는 N,M 50이니 2500임

3. 자료구조
- 전체 지도 : int[][] + (0:청소x, 1:벽, 2:청소o)
- 내위치, 방향 : int, int, int 
- 전체 cnt : int

로봇 청소기는 다음과 같이 작동한다.

현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
현재 칸의 주변 
$4$칸 중 청소되지 않은 빈 칸이 없는 경우,
바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
현재 칸의 주변 
$4$칸 중 청소되지 않은 빈 칸이 있는 경우,
반시계 방향으로 90도 회전한다.
바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
1번으로 돌아간다.

""" 

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
y, x, d = map(int, input().split())
map = [list(map(int, input().split())) for _ in range(N)]
cnt = 0

dx = [0, 1, 0, -1]
dy = [-1, 0, 1, 0]
# (0:청소x, 1:벽, 2:청소o)
while True:
  # 현재 칸 청소하며 cnt증가
  if map[y][x] == 0:
    map[y][x] = 2
    cnt += 1
  sw = False
  # 현재 근처칸들 검사
  # print("d",d)
  for i in range(1,5):
    # print("d-i",d-i)
    ny = y + dy[d-i] # 반시계로 90도 돌기에 현재 바라본 방향 d에서 1칸 
    nx = x + dx[d-i]
    #움직인 방향으로 가서 검사
    if 0 <= ny < N and 0 <= nx < M:
      if map[ny][nx] == 0: #청소하지 않은 공간 존재
        d = (d - i + 4) % 4
        y = ny
        x = nx
        sw = True
        break
  #for문이 끝남 -> 4방향 모두 청소가 됨 
  #근데 break문으로도 여길 올 수 있으니 sw로 구분
  if sw == False:
    ny = y - dy[d]
    nx = x - dx[d]
    if 0 <= ny < N and 0 <= nx < M:
      if  map[ny][nx] == 1: #막힌공간 
        break
      else:
        y = ny
        x = nx
        #여기까지하고 청소를 다시 하는게 아니라 근처칸 검사로 가야함
    else:
      break
print(cnt)
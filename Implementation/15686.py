"""
1. 문제설명
- 크기가 N * N인 도시 존재 각 칸은 빈 칸 0, 치킨집 2, 집 1 3개중 하나 도시는 r,c 1부터시작
- "치킨 거리"는 집과 가장 가까운 치킨집 사이의 거리  -> 각각의 집은 치킨거리가 있고, 도시의 치킨 거리는 모든 치킨 거리의 합
- 거리는 \r1-r2\ + \c1-c2\
- 한집이 여러 치킨집과의 거리를 구해서 최소가 치킨거리!!
2. 아이디어
- itertools 의 combinations을 이용
3. 시간복잡도
"""
import sys 
from itertools import combinations
input = sys.stdin.readline
N, M = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(N)]

home = []
chicken = []

for y in range(N):
  for x in range(N):
    if graph[y][x] == 1:
      home.append([y,x])
    elif graph[y][x] == 2:
      chicken.append([y,x])

result = 999999
for pick_ch in combinations(chicken, M):
  MIN = 0
  for pick_ho in home:
    dis = 999
    for k in range(M):
      dis = min(dis, abs(pick_ho[0] - pick_ch[k][0]) + abs(pick_ho[1] - pick_ch[k][1]))
    MIN += dis
  result = min(result, MIN)
print(result)
  
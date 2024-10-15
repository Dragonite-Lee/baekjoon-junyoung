"""
1. 문제설명
- 집 지을건데 높이가 똑같아야함 그래서 땅고르기 하려함
- 세로 N 가로 M 크기 집터 고름 왼쪽 위가 0,0 -> 높이를 일정하게 하는게 목표
- 1. i, j의 위의 블록을 제거해 인벤토리에 넣음 -> 2초 소요
- 2. 인벤토리에서 블록 하나 꺼내 i, j의 가장 위에 놓기 -> 1초 소요
- 땅고르기 작업에 걸리는 최소시간과 그때 땅의 높이
- 인벤에 B개의 블록 조재 음수안되고 256못넘김
2. 아이디어
- 첫째줄 N M B -> N M은 500까지  B는 64,000,000
- bfs?를 이용하며 현재 높이가 몇인지 체크 가장 많이 차지하고 있는 높이에 맞추기?
3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N, M, B = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(N)]
# print(graph)
result_time = float('inf')
result_height = 0
for i in range(257):
  time = 0
  use = B
  for y in range(N):
    for x in range(M):
      if graph[y][x] >= i:
        time += (graph[y][x] - i) * 2
        use += (graph[y][x] - i)
      else:
        time += (i - graph[y][x])
        use -= (i - graph[y][x])

  if use < 0:
    continue

  if time <= result_time:
    result_time = time
    result_height = i

print(result_time, result_height)
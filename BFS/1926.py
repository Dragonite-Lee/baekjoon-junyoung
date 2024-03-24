"""
1. 아이디어
- 2중 for문을 돌면서 값 1 && 방문x -> BFS
- BFS 돌면서 그림 개수 + 1, 최대값 갱신

2. 시간복잡도
- BFS O(V + E)
- V : m * n (m, n : 그래프 넓이)
- E : V * 4정도 (이보단 적음 모서리는 엣지가 적으니)
- 따라서 조건에 의해 v : 500 * 500, E : 4 * 500 * 500이므로 O(100만)

3. 자료구조
- 그래프 전체 지도 : int[][]
- 방문 : bool[][]
- Queue: BFS
"""

import sys
input = sys.stdin.readline

n, m = map(int, input().split())
map = [list(map(int, input().split())) for _ in range(n)]

visited = [[False] * m for _ in range(n)]

cnt = 0
maximum = 0
dx = [1, -1, 0, 0]
dy = [0, 0, 1, -1]

def bfs(y, x):
  q = [(y, x)]
  size = 1
  while q:
    ey, ex = q.pop()
    for k in range(4):
      nx = ex + dx[k]
      ny = ey + dy[k]
      if 0 <= nx < m and 0 <= ny < n:
        if map[ny][nx] == 1 and visited[ny][nx] == False:
          visited[ny][nx] = True
          size += 1
          q.append((ny,nx))
  return size


for j in range(n):
  for i in range(m):
    if map[j][i] == 1 and visited[j][i] == False:
      # 방문 표시
      visited[j][i] = True
      # 전체 그림 갯수 + 1
      cnt += 1
      # BFS -> 그림 크기 구함
      # 최대값 갱신
      maximum = max(maximum, bfs(j,i))
print(cnt)
print(maximum)
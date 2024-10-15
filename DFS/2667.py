"""
1. 아이디어
- 2중 for문을 돌면서 값 1 && 방문x -> DFS(재귀함수)
- 재귀함수 돌면서 값을 리스트에 저장
- 정렬 후 출력

2. 시간복잡도
- BFS O(V + E)
- V : m * n (m, n : 그래프 넓이)
- E : V * 4정도 (이보단 적음 모서리는 엣지가 적으니)
- 따라서 조건에 의해 v : 25 * 25, E : 4 * 25 * 25 이므로 O(625)임

3. 자료구조
- 그래프 전체 지도 : int[][]
- 방문 : bool[][]
- 결과값 : int[]
- 재귀함수 : DFS
"""

import sys
input = sys.stdin.readline

N = int(input())
map = [list(map(int, input().strip())) for _ in range(N)]
visited = [[False] * N for _ in range(N)]
result = []
each = 0

def dfs(y, x):
  global each
  each += 1
  dx = [1, 0, -1, 0]
  dy = [0, 1, 0, -1]

  for i in range(4):
    ny = y + dy[i]
    nx = x + dx[i]
    
    if 0 <= ny < N and 0 <= nx < N:
      if map[ny][nx] == 1 and visited[ny][nx] == False:
        visited[ny][nx] = True
        dfs(ny, nx)

for i in range(N):
  for j in range(N):
    if visited[i][j] == False and map[i][j] == 1:
      visited[i][j] = True
      each = 0
      dfs(i,j)
      result.append(each)

result.sort()
print(len(result))
for i in result:
  print(i)
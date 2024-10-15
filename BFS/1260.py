"""
1. 아이디어
- 간선 연결을 배열로 받음
- bfs의 시작점을 넣고 1 - 2가 간선 연결 배열에 있는지 && 방문x -> BFS
- 다시 리셋하고 2중 for문 돌면서 재귀로 간선 연결 배열 확인 && 방문x -> DFS

2. 시간복잡도
- BFS, DFS O(V + E)
- V는 1,000, E는 10,000
- 따라서 조건에 의해 O(11,000)정도

3. 자료구조
- 그래프 전체 지도 : int[][]
- 방문 : bool[][]
- Queue: BFS
- 재귀: DFS
"""
from collections import deque
import sys
input = sys.stdin.readline

N, M, V = map(int, input().split())

graph = [[False] * (N+1) for _ in range(N+1)] # 간선 연결용 그래프
print(graph)
visited_dfs = [False] * (N+1)
visited_bfs = [False] * (N+1)

for _ in range(M):
  a, b = map(int, input().split())
  graph[a][b] = True
  graph[b][a] = True

def dfs(num):
  # 시작값 방문 처리
  visited_dfs[num] = True
  print(num, end=' ')
  for i in range(1, N+1):
    if graph[num][i] == True and visited_dfs[i] == False:
      dfs(i)

def bfs(start):
  # 시작값 넣기
  dq = deque([start])
  # 시작값 방문 처리
  visited_bfs[start] = True
  while dq:
    eq = dq.popleft()
    print(eq, end=' ')
    
    for i in range(1, N+1):
      if graph[eq][i] == True and visited_bfs[i] == False: # 간선이 연결되어 있고, 방문하지 않은 곳
        visited_bfs[i] = True # 방문 표시
        dq.append(i) # 다음 정점 추가

dfs(V)
print()
bfs(V)
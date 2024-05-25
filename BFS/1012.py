"""
1. 아이디어
- 배추 즉 1인 땅을 조사하면 되니 이중 for문을 돌면서 1인곳 size 체크
2. 시간복잡도
- O(V+E) 노드와 연결부위 즉, 2500에 10000 이면 가능
3. 자료구조
- size int
- map int[]
- visited boolean[]
"""
import sys
input = sys.stdin.readline

T = int(input())


for _ in range(T):
  M, N, K = map(int, input().split())
  tree = [[0] * M for _ in range(N)]
  
  cnt = 0
  visited = [[False] * M for _ in range(N)]
  for _ in range(K):
    X, Y = map(int, input().split())
    tree[Y][X] = 1

  def BFS(y,x):
    q = [(y,x)]
    nx = [1, 0, -1, 0]
    ny = [0, 1, 0, -1]
    while q:
      dy, dx = q.pop()
      for k in range(4):
        ey = dy + ny[k]
        ex = dx + nx[k]
        if 0 <= ey < N and 0 <= ex < M:
          if tree[ey][ex] == 1 and visited[ey][ex] == False:
            visited[ey][ex] = True
            q.append((ey,ex))
            
  for i in range(N):
    for j in range(M):
      if tree[i][j] == 1 and visited[i][j] == False:
        visited[i][j] = True
        BFS(i,j)
        cnt += 1
  print(cnt)

  
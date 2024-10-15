"""
1.문제설명
- N*N게임판 왼쪽위에서 오른쪽아래로 감
- 각 칸에 적힌 수는 현재 칸에서 갈 수 있는 거리를 의미 (오른쪽이나 아래로만 감)
- 0은 종착
"""
import sys
input = sys.stdin.readline

N = int(input())

graph = [list(map(int, input().split())) for _ in range(N)]

op = [[0] * N for _ in range(N)]
op[0][0] = 1

for i in range(N):
  for j in range(N):
    if op[i][j] != 0 and graph[i][j] != 0:
      if i + graph[i][j] < N:
        op[i + graph[i][j]][j] += op[i][j]
      if j + graph[i][j] < N:
        op[i][j+ graph[i][j]] += op[i][j]

print(op[N-1][N-1])
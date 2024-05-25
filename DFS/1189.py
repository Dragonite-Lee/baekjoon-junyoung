"""
1. 아이디어
- 일반적인 Tree구조를 돌아다니는데 갈 수 있는 곳이면 1씩 더한 값을 넣어서 전 값보다 크면 가기
2. 시간복잡도
- O(V+E)인데 25에 100 이니 125라 가능
3. 자료구조
- tree int[]
- visited boolean[]
- size int
- result int
"""
import sys
input = sys.stdin.readline

R, C, K = map(int, input().split())
tree = [list(input().strip())  for _ in range(R)]

result = 0
tree[R-1][0] = 1

def DFS(y,x):
  global result
  if y == 0 and x == C - 1:
    if tree[y][x] == K:
      result += 1
      return
  
  nx = [1, 0, -1, 0]
  ny = [0, 1, 0, -1]
  for i in range(4):
    ex = x + nx[i]
    ey = y + ny[i]
    if 0 <= ex < C and 0 <= ey < R:
      if tree[ey][ex] == '.':
        tree[ey][ex] = tree[y][x] + 1
        DFS(ey,ex)
        tree[ey][ex] = '.'

DFS(R-1, 0)
print(result)
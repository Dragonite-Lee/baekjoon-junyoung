"""
1. 문제설명
- 수빈이가 동생찾기
- 걷기 -> 1초후 x-1 x+1
- 순간이동 -> 1초후 2x
2. 아이디어
- bfs로 동생찾기 
- 찾을때 마다 count 그리고 최초 찾은 count의 초

"""
import sys
from collections import deque
input = sys.stdin.readline
N, K = map(int, input().split())

result = 0

visited = [-1] * (100001)
visited[N] = 0
def bfs(start, finish):
  global result
  dq = deque()
  dq.append(start)
  while dq:
    pop_element = dq.popleft()
    
    if pop_element == finish:
      result += 1

    for next in [pop_element-1, pop_element+1, pop_element*2]:
      if 0 <= next < 100001:
        if visited[next] == -1 or visited[next] >= visited[pop_element]+1:
          visited[next] = visited[pop_element] + 1
          dq.append(next)
bfs(N,K)
print(visited[K])
print(result)
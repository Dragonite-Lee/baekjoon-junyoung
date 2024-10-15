"""
1. 문제설명 
- 수빈이가 동생잡기
- 이동만 1초 x-1 x+1 순간이동은 *2인데 0초임
2. 아이디어 
- bfs 각 순간에 할 수 있는 선택지를 늘여놓기
"""
import sys
from collections import deque
input = sys.stdin.readline

N, K = map(int, input().split())

dq = deque()
dq.append(N)

visited = [-1] * 100001
visited[N] = 0
while dq:
  now = dq.popleft()

  if now == K:
    break

  for next in [now+1, now-1, now*2]:
    if next == now * 2:
      if 0 <= next < 100001:
        if visited[next] == -1  or visited[next] >= visited[now]:
          dq.append(next)
          visited[next] = visited[now]
    else:
      if 0 <= next < 100001:
        if visited[next] == -1 or visited[next] >= visited[now] + 1:
          dq.append(next)
          visited[next] = visited[now] + 1
      
print(visited[K])
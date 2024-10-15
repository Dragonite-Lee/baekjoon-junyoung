"""
1.문제설명
- 가장 빠른 시간을 구하고 그때 어떻게 이동해야하는지 구하기
"""

import sys
from collections import deque
input = sys.stdin.readline

N, K = map(int, input().split())

dq = deque()
dq.append(N)

visited = [-1] * 100001
result = [[] for _ in range(100001)]
visited[N] = 0

while dq:
  now = dq.popleft()

  if now == K:
    break

  for next in [now-1, now+1, now*2]:
    if 0 <= next < 100001:
      if visited[next] == -1 or visited[next] >= visited[now] + 1:
        visited[next] = visited[now] + 1
        dq.append(next)
        result[next] = now 

print(visited[K])

# str = " ".join(result)
re = []
if N != K:
  while True:
    re.append(K)
    K = result[K]
    if K == N:
      re.append(K)
      break
else:
  re.append(N)

re.reverse()
print(*re)
"""
1. 문제설명
- 매 게임마다 건물을 짓는 순서가 주어진다. 그고 모든 건물은 각각 건설을 시작하여 완성이 될 때까지 Delay가 존재한다.
- 특정건물을 가장 빨리 지을때까지 걸리는 최소시간 알아내기
2. 아이디어
- 자기한테 들어오는걸 정리하고,
- 하나도 없는애부터 큐에 넣고 시작
- 큐가 빌때까지 계속하는데, 중간에 탈출 조건은 W가 다 지어지는 시점
- 시간을 계속더해가면서 짓기
- 여기서 시간을 계쏙더하면 안됨 같은 큐에 들어가있는건 최대시간만 넣어야됨 -> 리스트를 제작해 나중에 이걸 더하는 식
-> dp를 이용해 현재 값과 나에게 오는 아이의 값 + 내 값 중 더 큰게뭔지 고름
3. 시간복잡도

"""
import sys
input = sys.stdin.readline
from collections import deque

T = int(input())
result = []
for _ in range(T):
  N, K = map(int, input().split())
  build_time = list(map(int, input().split()))
  build_index = [[] for _ in range(N+1)]
  inDegree = [0 for _ in range(N+1)]
  for _ in range(K):
    X, Y = map(int, input().split()) # x를 지은 다음 y를 짓는 것이 가능하다는 의미
    build_index[X].append(Y)
    inDegree[Y] += 1 
  W = int(input())

  dq = deque()

  max_time = [0 for _ in range(N+1)]

  for i in range(1, N+1):
      if inDegree[i] == 0:
        dq.append(i)
        max_time[i] = build_time[i-1]
  
  while dq:
    pop_el = dq.popleft()
    for next in build_index[pop_el]:
      inDegree[next] -= 1
      max_time[next] = max(max_time[next], build_time[next-1] + max_time[pop_el])
      if inDegree[next] == 0:
        dq.append(next)

  print(max_time[W])
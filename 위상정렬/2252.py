"""
1. 문제설명
- 첫 줄에 N, M N은 학생들의 번호 1 ~ N, M은 키를 비교한 횟수
- A, B면 A가 B앞에 서야함
2. 아이디어
- A -> B인 위상정렬
- 위상정렬이란? 모든 간선이 조건을 만족하도록 정점들을 나열하는 것
- 먼저 진입차수가 0인 요소를 큐에 넣기 *진입차수란? 자기한테 들어오는 간선의 개수
- 큐에서 꺼내면서 진입차수가 0이된 애들을 큐에 넣기
3. 시간복잡도
"""
import sys
input = sys.stdin.readline
from collections import deque

N, M = map(int, input().split())
graph = [[] for _ in range(N+1)]
inDegree = [0 for _ in range(N+1)]

for _ in range(M):
  a, b = map(int, input().split())
  graph[a].append(b)
  inDegree[b] += 1

dq = deque()
for i in range(1,N+1):
  if inDegree[i] == 0:
    dq.append(i)

result = []
# print(dq)
while dq:
  pop_el = dq.popleft()
  result.append(pop_el)
  for next in graph[pop_el]:
    inDegree[next] -= 1
    if inDegree[next] == 0:
      result.append(next)

print(*result)
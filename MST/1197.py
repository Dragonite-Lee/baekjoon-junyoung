"""
1. 문제설명
- V는 10,000 E는 100,000 각각 정점의 개수 간선의 개수
- 그 뒤로 a -> b - 가중치
- 최소 스패닝 가중치 구하기
3 3
1 2 1
2 3 2
1 3 3
2. 아이디어
- 최소 스패닝 기본문제 암기
- 간선을 인접 리스트 형태로 저장
- 양방향 간선이니까 둘다 넣어주기
- 시작점부터 힙에 넣기
- 힙이 빌때까지, 해당 노드 방문 안한 곳이면 방문 체크, 비용 추가, 연결된 간선 새롭게 추가
3. 시간복잡도
- edge 리스트에 저장 o(E)
- heap 안에 모든 edge에 연결된 간선 확인 o(E+E)
- 모든 간선 힙에 삽입 o(ElogV)
- 따라서 o(ElogV)
"""
import sys
import heapq
input = sys.stdin.readline

V, E = map(int, input().split())
graph = [[] for _ in range(V+1)]
for i in range(E):
  a, b, c = map(int, input().split())
  graph[a].append([c, b])
  graph[b].append([c, a])

dist = [False] * (V+1)

heap = [[0, 1]]
result = 0

while heap:
  nw, nv = heapq.heappop(heap)
  if dist[nv] == False:
    dist[nv] = True
    result += nw
    for next_w, next_v in graph[nv]:
      if dist[next_v] == False:
        heapq.heappush(heap, [next_w, next_v])

print(result)
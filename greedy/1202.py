"""
1. 문제설명
- 가방엔 한개의 보석만 담을 수 있다.
- 훔치는 보석의 최대 가격을 구해라
2. 아이디어
- 작은 가방부터 담을 수 있는걸 배열에 다 담고
- 가치가 젤 큰걸 뽑음
- 가치가 젤 큰걸 뽑는건 최대힙 이용
3. 시간복잡도
-NlogN + KlogK + O(k)*logK -> O(NlogN)
"""
import sys
import heapq
input = sys.stdin.readline

N, K = map(int, input().split())
treasure = []
for _ in range(N):
  weight, cost = map(int, input().split())
  heapq.heappush(treasure, (weight, cost))

bags = []
for _ in range(K):
  weight = int(input())
  bags.append(weight)

bags.sort()

result = 0
temp = []
# print(treasure)
for bag in bags:
  while treasure and treasure[0][0] <= bag:
    heapq.heappush(temp, -treasure[0][1])
    heapq.heappop(treasure)
  if temp:
    result += -heapq.heappop(temp)
    # print(result)

print(result)
"""
1. 문제설명
- 가운데를 말해요 게임 항상 중간값을 말해야하며, 짝수라 중간값이 2개면 중간값중 가장 작은걸 말해야함
2. 아이디어
- 최대힙에 작은것들을 넣고
- 최소힙에 큰것들을 넣어
- 최대힙에서 매번 추출하면 중간값이 됨
3. 시간복잡도
"""
import sys
import heapq
input = sys.stdin.readline

N = int(input())

left = [] # 최대힙
right = [] # 최소힙
# print(len(left))
for i in range(N):
  num = int(input())
  if len(left) == len(right):
    heapq.heappush(left, -num)
  else:
    heapq.heappush(right, num)
  
  if right and right[0] < -left[0]:
    right_pop = heapq.heappop(right)
    left_pop = heapq.heappop(left)
    heapq.heappush(right, -left_pop)
    heapq.heappush(left, -right_pop)
  print(-left[0])
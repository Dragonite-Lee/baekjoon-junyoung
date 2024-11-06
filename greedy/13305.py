"""
1. 문제설명
- N개의 도시가 주어지고, 거리와 리터당 기름 금액이 주어짐
- 최소 비용 계산
2. 아이디어
- 첫 비용은 무조건 결제해야함
- 뒤로 가면서 작은 비용으로 갱신해서 결제 한다고 생각
3. 시간복잡도
- for문 1번 O(N)
"""
import sys
input = sys.stdin.readline

N = int(input())
road_length = list(map(int, input().split()))
oil_cost = list(map(int, input().split()))
# print(road_length)
# print(oil_cost)
minimum_cost = oil_cost[0]
result = 0
for i in range(N-1):
  if minimum_cost > oil_cost[i]:
    minimum_cost = oil_cost[i]
  result += (minimum_cost * road_length[i])

print(result)